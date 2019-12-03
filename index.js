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

// Match any text
bot.on('text', (msg) => {
    UsersLogs(msg);
});

// Match /module followed by 3 digits only
bot.on(/^\/module (\d{3})$/, (msg, props) => {
    const moduleID = props.match[1];
    if (typeof(modules[moduleID]) !== 'undefined') {
        var text = '*' + modules[moduleID].name + '* (' + moduleID + ')\n\n' +
        '• Type : ' + modules[moduleID].type + '\n' +
        '• Catégorie : ' + modules[moduleID].category + '\n\n' +
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
                      ' • /info - Donne des informations générales sur le bot'
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
        ' \n• [Plan d’études pour les écoles professionnelles](https://www.ict-berufsbildung.ch/fileadmin/user_upload/PlanEtudesEcole_INFO_V1.0_du_1.4.2014.pdf)'
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
