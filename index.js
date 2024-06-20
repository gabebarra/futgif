const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/google-chrome-stable',
    headless: true,
  },
  webVersionCache: {
    type: 'remote',
    remotePath:
      'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  },
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const sender = '120363283047565906@g.us'; // GIFGOL
const receiver = '120363273020068108@g.us'; // VPF 2024

// const sender = '120363273020068108@g.us';
// const receiver = '556499859851-1610905290@g.us';

// When the client is ready, run this code (only once)
client.on('ready', async () => {
  console.log('Client is ready!');
  console.log('Usuário: ', client.info.wid.user);
  console.log('Chat: ', sender);
  console.log('Grupo: ', receiver);

  // const allGroups = await client.getChats();
  // allGroups.map((group) => {
  //   console.log(group.name, group.id._serialized);
  // });
});

// When the client received QR-Code
client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, { small: true });
});

// Start your client
client.initialize();

client.on('message', async (msg) => {
  if ([sender].includes(msg.from)) {
    await sleep(Math.random() * 5000 + 1000);
    await msg.forward(receiver);
    console.log('Mensagem enviada!');
  }
});
