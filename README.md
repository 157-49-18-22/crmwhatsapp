# WhatsApp Bot

A simple WhatsApp bot built with whatsapp-web.js that can respond to messages and handle basic commands. Now with a beautiful web dashboard for easy control and monitoring!

## Features

- ✅ **Multi-Client Support** 👥 - Manage multiple WhatsApp accounts simultaneously
- ✅ **Session Persistence** 🔐 - No need to scan QR code every restart
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
   - **Session will be saved automatically** - no need to scan again on restart! 🔐

## Usage

### Available Commands

- `!ping` - Bot responds with "pong"
- `!hello` - Get a greeting message
- `!help` - Show all available commands
- `!time` - Get current date and time
- `!info` - Get information about the message (includes client ID)
- `!client` - Show which client you're using
- `!emoji` - Get some fun emojis
- `hello` or `hi` - Get a friendly greeting with emoji

### Message Logging

All incoming messages are logged to the console for debugging purposes.

## Web Dashboard Features

### 👥 **Multi-Client Management**
- Create and manage multiple WhatsApp bot instances
- Each client has its own session and message history
- Individual client status monitoring
- Client-specific QR code scanning

### 🎯 **Real-time Monitoring**
- Live message feed with sender and timestamp
- Real-time bot status updates for each client
- Live system logs with color coding
- Client-specific message filtering

### 📊 **Statistics Dashboard**
- Total clients count
- Connected vs disconnected clients
- Total messages across all clients
- Real-time updates

### 💬 **Manual Message Sending**
- Send messages to any WhatsApp number via selected client
- Format: `919354156323` (just the phone number)
- The @c.us suffix is added automatically
- Bot number is displayed for easy testing
- Instant feedback on message delivery

### 🔄 **Bot Control**
- Create new clients with custom IDs
- Restart individual clients
- Delete clients when no longer needed
- QR code scanning in browser for each client
- Connection status monitoring per client

### 🎨 **Beautiful Interface**
- Modern, responsive design
- Mobile-friendly layout
- Real-time updates without page refresh
- Client cards with status indicators

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

## Authentication

This bot uses **LocalAuth strategy** for session persistence:

- **Session Storage**: Sessions are saved locally in `sessions/{clientId}` directories
- **Persistence**: No need to scan QR code every time you restart the bot
- **Security**: Session data is stored locally on your machine
- **Compatibility**: Works on Windows, MacOS, and Linux
- **Multi-Client**: Each client has its own isolated session storage

### Alternative Authentication Options

If you need different authentication strategies:

1. **NoAuth** (default): No session persistence, scan QR every restart
2. **RemoteAuth**: Store sessions in databases (MongoDB, AWS S3) - requires additional setup

## Troubleshooting

- Make sure you have a stable internet connection
- The QR code regenerates every 30 seconds if not scanned
- If authentication fails, restart the bot and try scanning again
- Keep your phone connected to the internet while using the bot
- **Session files are stored in `sessions/{clientId}` directories** - don't delete these folders if you want to keep your sessions
- If you need to re-authenticate a specific client, delete its session folder and restart that client
- Each client operates independently - issues with one client won't affect others 