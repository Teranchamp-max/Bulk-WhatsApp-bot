const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox'],
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
