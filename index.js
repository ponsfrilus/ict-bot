const TeleBot = require('telebot');
const secret = require('./secret.json');
const modules = require('./data.json');

const bot = new TeleBot(secret.BOT_TOKEN);

// Match any text
bot.on('text', (msg) => {
    //msg.reply.text(msg.text)
});

// Match /module followed by 3 digits only
bot.on(/^\/module (\d{3})$/, (msg, props) => {
    const moduleID = props.match[1];
    var text = '*' + modules[moduleID].name + '* (' + moduleID + ')\n\n' +
               '• Type : ' + modules[moduleID].type + '\n' +
               '• Catégorie : ' + modules[moduleID].category + '\n\n' +
               'Pour plus d\'infos, cliquez sur [ce lien](' + modules[moduleID].link + ')';
    return bot.sendMessage(msg.from.id, text, {parseMode: 'Markdown'});
});

bot.on(['/start', '/help', '/h'], (msg) => {
    var messageHelp = '*Voici quelques commandes que vous pouvez utiliser* :\n' +
                      ' • /help | /h : affiche cette liste\n' +
                      ' • /modules <numModule> : affiche les informations générales du module\n' +
                      ' • /list | /all : affiche la liste de tous les modules'
    return bot.sendMessage(msg.from.id, messageHelp, {parseMode: 'Markdown'});
});

bot.on(['/list', '/all', '/listall'], (msg) => {
    var messageFinal = '*Voici la liste des différents modules* : \n';
    Object.keys(modules).forEach( (el, idx, ary) => {
        if(modules[el].category != 'Non développement d\'applications 2014'){
            messageFinal += '• `' + el + '` - ' + modules[el].name + ' [📄](' + modules[el].link + ')' + '\n';
        }
    });
    return bot.sendMessage(msg.from.id, messageFinal, {parseMode: 'Markdown'});
});

bot.start();
