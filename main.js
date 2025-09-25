const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a new client instance with LocalAuth for session persistence
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

let qrCodeData = null;

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('WhatsApp client is ready!');
});

// When the client received QR-Code
client.on('qr', async (qr) => {
    console.log('QR Code generated');
    qrCodeData = await QRCode.toDataURL(qr);
    // Don't print QR code to console in production
});

// Listening to all incoming messages
client.on('message_create', message => {
    // Prevent bot from responding to its own messages
    if (message.fromMe) {
        return;
    }
    
    console.log(`Message from ${message.from}: ${message.body}`);
    
    // Method 1: Direct reply to the message (recommended)
    if (message.body === '!ping') {
        message.reply('pong');
    }
    
    // Method 2: Send message to the same chat
    if (message.body === '!hello') {
        client.sendMessage(message.from, 'Hello! How can I help you?');
    }
    
    // Method 3: Reply with different types of responses
    if (message.body === '!help') {
        const helpText = `Available commands:
• !ping - Test if bot is working
• !hello - Get a greeting
• !help - Show this help message
• !time - Get current time
• !info - Get message info`;
        message.reply(helpText);
    }
    
    // Method 4: Reply with current time
    if (message.body === '!time') {
        const currentTime = new Date().toLocaleString();
        message.reply(`Current time: ${currentTime}`);
    }
    
    // Method 5: Reply with message information
    if (message.body === '!info') {
        const info = `Message Info:
• From: ${message.from}
• Type: ${message.type}
• Timestamp: ${message.timestamp}
• Is Group: ${message.from.includes('@g.us')}`;
        message.reply(info);
    }
    
    // Method 6: Reply to specific keywords
    if (message.body.toLowerCase().includes('hello') || message.body.toLowerCase().includes('hi')) {
        message.reply('👋 Hello! Nice to meet you!');
    }
    
    // Method 7: Reply with emojis and formatting
    if (message.body === '!emoji') {
        message.reply('😊 🎉 🚀 Here are some emojis for you!');
    }
});

// Express routes
app.get('/api/whatsapp/qr', (req, res) => {
    if (qrCodeData) {
        res.json({ qrCode: qrCodeData });
    } else {
        res.json({ qrCode: null, message: 'QR code not ready yet' });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', whatsapp: 'connected' });
});

// Start server
app.listen(PORT, () => {
    console.log(`WhatsApp Bot Server running on port ${PORT}`);
});

// Initialize WhatsApp client
client.initialize(); 
