const TeleBot = require('telebot');
const secret = require('./secret.json');
const modules = require('./data.json');

console.debug(secret.BOT_TOKEN);
const bot = new TeleBot(secret.BOT_TOKEN);

// Match any text
bot.on('text', (msg) => {
    console.debug(msg)
    //msg.reply.text(msg.text)
});

// Match /module followed by 3 digits only
bot.on(/^\/module (\d{3})$/, (msg, props) => {
    const moduleID = props.match[1];
    console.debug(moduleID);
    console.debug(modules[moduleID].name);
    var text = "*" + modules[moduleID].name +
               "*\n\n• Type : " + modules[moduleID].type +
               "\n• Catégorie : " + modules[moduleID].category +
               "\n\n" + "Pour plus d'infos, cliquez sur [ce lien](" + modules[moduleID].link + ")";
    return bot.sendMessage(msg.from.id, text, {parseMode: 'Markdown'});
});

bot.on(['/start', '/help'], (msg) => {
    msg.reply.text('Voici quelques commandes que vous pouvez utiliser : \n /help : affiche cette liste \n /modules <n°_du_module> : affiche les informations générales du module')
    
});
bot.start();
