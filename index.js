const fs = require('fs')
const TeleBot = require('telebot');
var BoToken = null;
try {
  var secret = require("./secret.json");
  BoToken = secret.BOT_TOKEN;
} catch (e) {
  console.log("Pas de secrets trouvé, on utilise process.env.BOT_TOKEN");
  BoToken = process.env.BOT_TOKEN;
}
const modules = require('./data.json');
const bot = new TeleBot(BoToken);

const package = require('./package.json');

// Match any text
bot.on('text', (msg) => {
    UsersLogs(msg);
});

// In case someone edit a `/module 000` message, warn that it won't work...
bot.on('edit', (msg) => {
    if ('/module' === msg.text.match(/^(\/module)(.+)$/)[1]) {
        return msg.reply.text('⚠ Le bot ne comprend pas les messages édités, merci de retapper la commande.', { asReply: true });
    }
});

// Match /module followed by 3 digits only /^\/module (\d{3})$/
bot.on(/^\/module(.+)$/, (msg, props) => {
    const moduleID = props.match[1].trim();
    if (typeof(modules[moduleID]) !== 'undefined') {
        var text = '*' + modules[moduleID].name + '* (' + moduleID + ')\n\n' +
        '• Compétences : ' + modules[moduleID].skill + '\n' +
        '• Domaine : ' + modules[moduleID].category + '\n' +
        '• Pré-requis : ' + modules[moduleID].preRequired + '\n' +
        '• Date de publication : ' + modules[moduleID].date + '\n' +
        '• Identification du module : [PDF](' + modules[moduleID].PDFLink + ')\n\n' +
        'Pour plus d\'infos, cliquez sur [ce lien](' + modules[moduleID].link + ')';
    } else {
        var text = 'Ce module n\'existe pas...';
    }
    return bot.sendMessage(msg.chat.id, text, {parseMode: 'Markdown'});
});

bot.on(['/start', '/help', '/h'], (msg) => {
    var messageHelp = '*Voici quelques commandes que vous pouvez utiliser* :\n' +
                      ' • /start - Commande principale du bot, affiche l\'aide\n' +
                      ' • /help | /h - Affiche cette liste\n' +
                      ' • /module <numModule> - Affiche les informations générales relatives au module\n' +
                      ' • /list | /all | /modules - Affiche la liste de tous les modules\n' +
                      ' • /info - Donne des informations générales sur le bot' +
                      ' \n\n _Ce bot est actuellement en version ' + package.version + '_' +
                      ' \n *Code Source :* [ICT-BOT Github](https://github.com/ponsfrilus/ict-bot)' +
                      ' \n *Signaler un bug :* [ICT-BOT Issues](https://github.com/ponsfrilus/ict-bot/issues)'
    return bot.sendMessage(msg.chat.id, messageHelp, {parseMode: 'Markdown'});
});

bot.on(['/list', '/all', '/listall'], (msg) => {
    var messageFinal = '*Voici la liste des différents modules* : \n';
    Object.keys(modules).forEach( (el, idx, ary) => {
        if(modules[el].category != 'Non développement d\'applications 2014'){
            messageFinal += '• `' + el + '` - ' + modules[el].name + ' [📄](' + modules[el].link + ')' + '\n';
        }
    });
    return bot.sendMessage(msg.chat.id, messageFinal, {parseMode: 'Markdown'});
});

bot.on('/info', (msg) => {
    var messageInfos = 'Ce bot Telegram ' +
        'permet d\'obtenir les informations sur les modules disponibles pour les ' +
        'apprentis CFC en voie [développement d\'applications](https://www.ict-berufsbildung.ch/' +
        'fr/formation-professionnelle/informaticien-ne-cfc-developpement-dapplications/),' +
        ' selon l\'[ordonnance 2014](https://www.ict-berufsbildung.ch/fileadmin/user_upload/' +
        '02_Francais/01_formation_initiale/PDF/Bildungsverordnung_Informatiker_in_EFZ-100f-20131017TRR.pdf)' +
        ' du [SEFRI](https://www.sbfi.admin.ch/sbfi/fr/home.html).\n\n' +
        '*Liens* : ' +
        ' \n• [Informaticien/-ne CFC Développement d\'applications](https://www.ict-berufsbildung.ch/fr/formation-professionnelle/informaticien-ne-cfc-developpement-dapplications/)' +
        ' \n• [ICT Competence Framework](https://cf.ict-berufsbildung.ch/)' +
        ' \n• [Recherche de modules](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20100)' +
        ' \n• [Visualisation des modules](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20103&nvorlageid=15&nabschlussid=)' +
        ' \n• [Visualisation des modules (PDF)](https://cf.ict-berufsbildung.ch/modules.php?Mbk&a=20105&nvorlageid=15)' +
        ' \n• [Plan d’études pour les écoles professionnelles](https://www.ict-berufsbildung.ch/fileadmin/user_upload/PlanEtudesEcole_INFO_V1.0_du_1.4.2014.pdf)' +
        ' \n\n _Ce bot est actuellement en version ' + package.version + '_' +
        ' \n *Code Source :* [ICT-BOT Github](https://github.com/ponsfrilus/ict-bot)' +
        ' \n *Signaler un bug :* [ICT-BOT Issues](https://github.com/ponsfrilus/ict-bot/issues)'
    return bot.sendMessage(msg.chat.id, messageInfos, {parseMode: 'Markdown'});
});

function UsersLogs(msg){
    let msgUsrLog = "";
    var date = new Date(msg.date * 1000);
    msgUsrLog += "\n\n" + date.toISOString() + "\n";
    msgUsrLog += "  User: " + msg.from.first_name + " (" + msg.from.username + ")" + "\n";
    msgUsrLog += "  User ID: " + msg.from.id + "\n";
    msgUsrLog += "  Chat ID: " + msg.chat.id + "\n";
    msgUsrLog += "  Content: " + msg.text;
    console.log(msgUsrLog);
}

bot.start();
