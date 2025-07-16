# CRM Integration with WhatsApp Bot

This WhatsApp bot dashboard now integrates with your CRM system to display and manage leads directly from the WhatsApp interface.

## Features

### 1. CRM Leads Display
- Shows all leads from your CRM database organized by their stages (Initial, Discussion, etc.)
- Displays lead information including name, company, phone number, and email
- Real-time updates when you refresh the data

### 2. Lead Management
- View detailed information about each lead
- Send WhatsApp messages directly to leads
- Organize leads by their current stage in the pipeline

### 3. Statistics
- Shows total number of leads from CRM
- Displays leads count alongside other WhatsApp bot statistics

## Setup Requirements

### 1. CRM Backend Server
Make sure your CRM backend server is running on `http://localhost:5000` with the following endpoints:
- `GET /api/leads` - Returns all leads
- `GET /api/pipeline/all` - Returns all pipelines and stages

### 2. WhatsApp Bot Server
The WhatsApp bot server now includes:
- CRM API integration using axios
- New endpoints for fetching CRM data
- Socket events for real-time CRM data updates

## How to Use

1. **Start your CRM backend server** (should be running on port 5000)
2. **Start the WhatsApp bot server**:
   ```bash
   cd wwebjs-bot
   npm run server
   ```
3. **Open the WhatsApp bot dashboard** at `http://localhost:3000`
4. **Create a WhatsApp client** and connect it
5. **View your CRM leads** in the "CRM Leads by Stage" section
6. **Send messages to leads** by clicking the "Message" button

## API Endpoints Added

### Server-side (WhatsApp Bot)
- `GET /api/crm/leads` - Fetch all CRM data (leads + pipelines)
- `GET /api/crm/leads/by-stage` - Fetch leads organized by stage

### Socket Events
- `refreshCRMData` - Request fresh CRM data
- `sendMessageToLead` - Send WhatsApp message to a specific lead
- `crmData` - Receive updated CRM data from server

## Lead Information Displayed

For each lead, the dashboard shows:
- **Name**: Contact name or lead name
- **Company**: Company name
- **Phone**: Contact phone number (used for WhatsApp messaging)
- **Email**: Contact email address
- **Stage**: Current stage in the pipeline
- **Amount**: Lead value/amount
- **Created**: Creation date

## Error Handling

- If the CRM server is not running, appropriate error messages will be displayed
- Network timeouts are set to 5 seconds for CRM API calls
- Graceful fallbacks when CRM data is unavailable

## File Structure

### Modified Files
- `server.js` - Added CRM API integration and new endpoints
- `public/index.html` - Added CRM leads display and functionality
- `package.json` - Added axios dependency

### New Features
- CRM leads display with stage-based organization
- Direct messaging to leads via WhatsApp
- Lead details viewer
- Real-time CRM data refresh
- Statistics integration

## Troubleshooting

1. **"No leads found in CRM"** - Make sure your CRM backend is running on port 5000
2. **"CRM server is not running"** - Start your CRM backend server first
3. **Messages not sending** - Ensure you have selected a WhatsApp client and it's connected
4. **Phone number issues** - Make sure leads have valid phone numbers in the CRM

## Future Enhancements

- Bulk messaging to multiple leads
- Lead stage updates from WhatsApp
- Message history per lead
- Lead creation from WhatsApp conversations
- Automated follow-up messages based on lead stage 