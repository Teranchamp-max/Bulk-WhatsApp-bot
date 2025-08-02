const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🤖 WhatsApp bot is running!');
});

app.listen(PORT, () => {
    console.log(`🌐 Web server listening on port ${PORT}`);
});

// --- WhatsApp Bot Logic ---
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

client.on('qr', (qr) => {
    console.log('📱 Scan this QR to log in:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp bot is ready!');
});

client.on('message', msg => {
    if (msg.body === '!ping') {
        msg.reply('pong ✅');
    }
});

client.initialize();
