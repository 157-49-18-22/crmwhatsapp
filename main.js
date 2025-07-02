const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client();

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
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

// Start your client
client.initialize(); 