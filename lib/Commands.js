const modules = require('../data.json');
const packagejson = require('./../package.json');

class Commands {

    constructor(bot){
        this.bot = bot
    }

    info(msg){
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
        ' \n\n _Ce bot est actuellement en version ' + packagejson.version + '_' +
        ' \n *Code Source :* [ICT-BOT Github](https://github.com/ponsfrilus/ict-bot)' +
        ' \n *Signaler un bug :* [ICT-BOT Issues](https://github.com/ponsfrilus/ict-bot/issues)'
        return this.bot.sendMessage(msg.chat.id, messageInfos, {parseMode: 'Markdown'});
    }

    // Match /module followed by 3 digits only /^\/module (\d{3})$/
    module(msg){
        const moduleID = msg.props[1];
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
        return this.bot.sendMessage(msg.chat.id, text, {parseMode: 'Markdown'});
    }

    list(msg){
        var messageFinal = '*Voici la liste des différents modules* : \n';
        Object.keys(modules).forEach( (el, idx, ary) => {
            if(modules[el].category != 'Non développement d\'applications 2014'){
                messageFinal += '• `' + el + '` - ' + modules[el].name + ' [📄](' + modules[el].link + ')' + '\n';
            }
        });
        console.log(messageFinal)
        // return this.bot.sendMessage(msg.chat.id, messageFinal, {parseMode: 'Markdown'});
    }
    all(msg){this.list(msg)}
    listall(msg){this.list(msg)}


    async errorCmd(msg) {
        msg.reply.text(`Commande \`${msg.props[0]}\` introuvable... Tapez /help pour obtenir la liste des commandes valides`, {parseMode: 'Markdown'})
    }

    start(msg){
        var messageHelp = '*Voici quelques commandes que vous pouvez utiliser* :\n' +
        ' • /start - Commande principale du bot, affiche l\'aide\n' +
        ' • /help | /h - Affiche cette liste\n' +
        ' • /module <numModule> - Affiche les informations générales relatives au module\n' +
        ' • /list | /all | /modules - Affiche la liste de tous les modules\n' +
        ' • /info - Donne des informations générales sur le bot' +
        ' \n\n _Ce bot est actuellement en version ' + packagejson.version + '_' +
        ' \n *Code Source :* [ICT-BOT Github](https://github.com/ponsfrilus/ict-bot)' +
        ' \n *Signaler un bug :* [ICT-BOT Issues](https://github.com/ponsfrilus/ict-bot/issues)'
        return this.bot.sendMessage(msg.chat.id, messageHelp, {parseMode: 'Markdown'});
    }
    help(msg){this.start(msg)}
    h(msg){this.start(msg)}
}

module.exports = Commands