const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your Telegram bot token
const token = process.env.TELEGRAM_BOT_TOKEN;
const webhookUrl = `https://quidditch-mini-app.onrender.com/webhook`;

// Set webhook
axios.post(`https://api.telegram.org/bot${token}/setWebhook`, {
    url: webhookUrl
}).then(response => {
    console.log('Webhook set:', response.data);
}).catch(error => {
    console.error('Error setting webhook:', error);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Webhook endpoint
app.post('/webhook', (req, res) => {
    const message = req.body.message;
    console.log('Received message:', message);

    // Process the message (e.g., respond to it)
    res.send('ok');
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
