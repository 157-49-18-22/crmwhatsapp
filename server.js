const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create a new client instance
const client = new Client();

// Store bot status and messages
let botStatus = 'disconnected';
let qrCodeData = null;
let messages = [];

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
    botStatus = 'connected';
    qrCodeData = null;
    
    // Get the bot's own number for easy testing
    const botNumber = client.info.wid._serialized;
    
    io.emit('botStatus', { status: botStatus, qrCode: null });
    io.emit('log', { type: 'success', message: 'WhatsApp bot is ready and connected!' });
    io.emit('log', { type: 'info', message: `Bot number: ${botNumber}` });
    io.emit('log', { type: 'info', message: 'You can send messages to this number for testing!' });
});

// When the client received QR-Code
client.on('qr', async (qr) => {
    console.log('QR RECEIVED');
    botStatus = 'qr_ready';
    try {
        qrCodeData = await qrcode.toDataURL(qr);
        io.emit('botStatus', { status: botStatus, qrCode: qrCodeData });
        io.emit('log', { type: 'info', message: 'QR Code generated. Please scan with WhatsApp.' });
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
});

// When the client is disconnected
client.on('disconnected', (reason) => {
    console.log('Client was disconnected', reason);
    botStatus = 'disconnected';
    io.emit('botStatus', { status: botStatus, qrCode: null });
    io.emit('log', { type: 'warning', message: 'WhatsApp bot disconnected. Please reconnect.' });
});

// Listening to all incoming messages
client.on('message_create', message => {
    // Prevent bot from responding to its own messages
    if (message.fromMe) {
        return;
    }
    
    console.log(`Message from ${message.from}: ${message.body}`);
    
    // Add message to our store
    const messageData = {
        id: Date.now(),
        from: message.from,
        body: message.body,
        timestamp: new Date().toLocaleString(),
        type: 'received'
    };
    messages.push(messageData);
    
    // Emit to frontend
    io.emit('newMessage', messageData);
    
    // Method 1: Direct reply to the message (recommended)
    if (message.body === '!ping') {
        message.reply('pong');
        addBotMessage('pong', message.from);
    }
    
    // Method 2: Send message to the same chat
    else if (message.body === '!hello') {
        client.sendMessage(message.from, 'Hello! How can I help you?');
        addBotMessage('Hello! How can I help you?', message.from);
    }
    
    // Method 3: Reply with different types of responses
    else if (message.body === '!help') {
        const helpText = `Available commands:
• !ping - Test if bot is working
• !hello - Get a greeting
• !help - Show this help message
• !time - Get current time
• !info - Get message info`;
        message.reply(helpText);
        addBotMessage(helpText, message.from);
    }
    
    // Method 4: Reply with current time
    else if (message.body === '!time') {
        const currentTime = new Date().toLocaleString();
        message.reply(`Current time: ${currentTime}`);
        addBotMessage(`Current time: ${currentTime}`, message.from);
    }
    
    // Method 5: Reply with message information
    else if (message.body === '!info') {
        const info = `Message Info:
• From: ${message.from}
• Type: ${message.type}
• Timestamp: ${message.timestamp}
• Is Group: ${message.from.includes('@g.us')}`;
        message.reply(info);
        addBotMessage(info, message.from);
    }
    
    // Method 6: Reply to specific keywords
    else if (message.body.toLowerCase().includes('hello') || message.body.toLowerCase().includes('hi')) {
        message.reply('👋 Hello! Nice to meet you!');
        addBotMessage('👋 Hello! Nice to meet you!', message.from);
    }
    
    // Method 7: Reply with emojis and formatting
    else if (message.body === '!emoji') {
        message.reply('😊 🎉 🚀 Here are some emojis for you!');
        addBotMessage('😊 🎉 🚀 Here are some emojis for you!', message.from);
    }
});

// Helper function to add bot messages
function addBotMessage(body, to) {
    const messageData = {
        id: Date.now(),
        from: 'Bot',
        to: to,
        body: body,
        timestamp: new Date().toLocaleString(),
        type: 'sent'
    };
    messages.push(messageData);
    io.emit('newMessage', messageData);
}

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('Frontend connected');
    
    // Send current status
    socket.emit('botStatus', { status: botStatus, qrCode: qrCodeData });
    socket.emit('messages', messages);
    
    // Handle manual message sending
    socket.on('sendMessage', async (data) => {
        try {
            if (botStatus === 'connected') {
                // Format phone number properly
                let formattedNumber = data.to;
                
                // Remove any non-digit characters except @
                formattedNumber = formattedNumber.replace(/[^\d@]/g, '');
                
                // If no @c.us suffix, add it
                if (!formattedNumber.includes('@')) {
                    formattedNumber = formattedNumber + '@c.us';
                }
                
                // Validate phone number format
                if (!formattedNumber.match(/^\d+@c\.us$/)) {
                    throw new Error('Invalid phone number format. Use: 1234567890 or 1234567890@c.us');
                }
                
                await client.sendMessage(formattedNumber, data.message);
                addBotMessage(data.message, formattedNumber);
                socket.emit('log', { type: 'success', message: 'Message sent successfully!' });
            } else {
                socket.emit('log', { type: 'error', message: 'Bot is not connected!' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('log', { type: 'error', message: 'Failed to send message: ' + error.message });
        }
    });
    
    // Handle bot restart
    socket.on('restartBot', () => {
        try {
            client.destroy();
            client.initialize();
            socket.emit('log', { type: 'info', message: 'Bot restarting...' });
        } catch (error) {
            socket.emit('log', { type: 'error', message: 'Failed to restart bot: ' + error.message });
        }
    });
    
    socket.on('disconnect', () => {
        console.log('Frontend disconnected');
    });
});

// API Routes
app.get('/api/status', (req, res) => {
    res.json({ status: botStatus, qrCode: qrCodeData });
});

app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
    
    // Initialize the WhatsApp client
    client.initialize();
}); 