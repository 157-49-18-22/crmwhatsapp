# WhatsApp Bot

A simple WhatsApp bot built with whatsapp-web.js that can respond to messages and handle basic commands. Now with a beautiful web dashboard for easy control and monitoring!

## Features

- ✅ QR Code authentication
- ✅ Message listening and logging
- ✅ Simple ping/pong command (`!ping`)
- ✅ Direct message replies
- ✅ **Beautiful Web Dashboard** 🌐
- ✅ **Real-time Message Monitoring** 📱
- ✅ **Manual Message Sending** 💬
- ✅ **Live System Logs** 📊
- ✅ **Message Statistics** 📈
- ✅ **Bot Status Monitoring** 🔄

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the bot:**

   **Option A: Terminal Mode (Simple)**
   ```bash
   npm start
   ```
   or
   ```bash
   node main.js
   ```

   **Option B: Web Dashboard Mode (Recommended)**
   ```bash
   npm run server
   ```
   Then open http://localhost:3000 in your browser

3. **Authenticate with WhatsApp:**
   - **Terminal Mode**: QR code appears in terminal
   - **Web Dashboard**: QR code appears in browser
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Scan the QR code
   - Once scanned, you'll see "Client is ready!" message

## Usage

### Available Commands

- `!ping` - Bot responds with "pong"
- `!hello` - Get a greeting message
- `!help` - Show all available commands
- `!time` - Get current date and time
- `!info` - Get information about the message
- `!emoji` - Get some fun emojis
- `hello` or `hi` - Get a friendly greeting with emoji

### Message Logging

All incoming messages are logged to the console for debugging purposes.

## Web Dashboard Features

### 🎯 **Real-time Monitoring**
- Live message feed with sender and timestamp
- Real-time bot status updates
- Live system logs with color coding

### 📊 **Statistics Dashboard**
- Total messages count
- Received vs sent messages
- Real-time updates

### 💬 **Manual Message Sending**
- Send messages to any WhatsApp number
- Format: `919354156323` (just the phone number)
- The @c.us suffix is added automatically
- Bot number is displayed for easy testing
- Instant feedback on message delivery

### 🔄 **Bot Control**
- Restart bot functionality
- QR code scanning in browser
- Connection status monitoring

### 🎨 **Beautiful Interface**
- Modern, responsive design
- Mobile-friendly layout
- Real-time updates without page refresh

## Project Structure

```
wwebjs-bot/
├── main.js          # Terminal bot file
├── server.js        # Web server with dashboard
├── public/
│   └── index.html   # Web dashboard interface
├── package.json     # Project configuration
├── package-lock.json # Dependency lock file
└── README.md        # This file
```

## Dependencies

- `whatsapp-web.js` - WhatsApp Web API wrapper
- `qrcode-terminal` - QR code generation for terminal
- `qrcode` - QR code generation for web dashboard
- `express` - Web server framework
- `socket.io` - Real-time communication
- `cors` - Cross-origin resource sharing

## Troubleshooting

- Make sure you have a stable internet connection
- The QR code regenerates every 30 seconds if not scanned
- If authentication fails, restart the bot and try scanning again
- Keep your phone connected to the internet while using the bot 