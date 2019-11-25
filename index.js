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
    if (typeof(modules[moduleID]) !== 'undefined') {
        var text = '*' + modules[moduleID].name + '* (' + moduleID + ')\n\n' +
        '• Type : ' + modules[moduleID].type + '\n' +
        '• Catégorie : ' + modules[moduleID].category + '\n\n' +
        'Pour plus d\'infos, cliquez sur [ce lien](' + modules[moduleID].link + ')';
    } else {
        var text = 'Ce module n\'existe pas...';
    }
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

bot.on('/info', (msg) => {
    var messageInfos = 'Projet de [bot telegram](https://telegram.org/blog/bot-revolution) permettant d\'obtenir les informations sur les modules disponibles pour les apprentis CFC en voie [développement d\'applications](https://www.ict-berufsbildung.ch/fr/formation-professionnelle/informaticien-ne-cfc-developpement-dapplications/), selon l\'[ordonnance 2014](https://www.ict-berufsbildung.ch/fileadmin/user_upload/02_Francais/01_formation_initiale/PDF/Bildungsverordnung_Informatiker_in_EFZ-100f-20131017TRR.pdf) du [SEFRI](https://www.sbfi.admin.ch/sbfi/fr/home.html).\n\nLes informations des modules se trouvent dans le fichier [data.json](https://github.com/ponsfrilus/ict-bot/blob/master/data.json) et ont été récupérée sur [ICT Competence Framework](https://cf.ict-berufsbildung.ch/). Les pages de [recherche de modules](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20100&clang=fr) et de [visualisation du plan modulaire](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20103&nvorlageid=15&nabschlussid=&clang=fr) sont la source des informations présentes dans [data.json](https://github.com/ponsfrilus/ict-bot/blob/master/data.json).\n\n*Liens* : \n• [Informaticien/-ne CFC Développement d\'applications](https://www.ict-berufsbildung.ch/fr/formation-professionnelle/informaticien-ne-cfc-developpement-dapplications/)\n• [ICT Competence Framework](https://cf.ict-berufsbildung.ch/)\n• [Recherche de modules](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20100)\n• [Visualisation des modules](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20103&nvorlageid=15&nabschlussid=)\n• [Visualisation des modules (PDF)](https://cf.ict-berufsbildung.ch/modules.php?Mbk&a=20105&nvorlageid=15)\n• [Plan d’études pour les écoles professionnelles](https://www.ict-berufsbildung.ch/fileadmin/user_upload/PlanEtudesEcole_INFO_V1.0_du_1.4.2014.pdf)'
    return bot.sendMessage(msg.from.id, messageInfos, {parseMode: 'Markdown'});
});

bot.start();
