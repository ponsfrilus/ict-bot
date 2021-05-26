const TeleBot = require('telebot');
var BoToken = null;
try {
  var secret = require("./secret.json");
  BoToken = secret.ICT_BOT_TOKEN;
} catch (e) {
  console.log("Pas de secrets trouvé, on utilise process.env.ICT_BOT_TOKEN");
  BoToken = process.env.ICT_BOT_TOKEN;
}

const bot = new TeleBot(BoToken);
const Commands = require('./lib/Commands');
const cmd = new Commands(bot);


// Match any text
bot.on('text', async (msg) => {
    let botInfos = await bot.getMe();
    let msgArray = msg.text.split(' ')
    let cmdName = msg.text[0] == "/" ? msgArray[0].substring(1).split('@')[0].toLowerCase() : msgArray[0].split('@')[0].toLowerCase()
    console.log(cmdName);
    msg.props = msgArray
    new RegExp(`(^${cmdName})(@${botInfos.username})?$`).test(msgArray[0].substring(1).toLowerCase()) && typeof cmd[cmdName] === "function" ? cmd[cmdName](msg) : cmd.errorCmd(msg);
    UsersLogs(msg);
});

// In case someone edit a `/module 000` message, warn that it won't work...
bot.on('edit', (msg) => {
    if ('/module' === msg.text.match(/^(\/module)(.+)$/)[1]) {
        return msg.reply.text('⚠ Le bot ne comprend pas les messages édités, merci de retapper la commande.', { asReply: true });
    }
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
