const { CLIENT } = require('./constants');

const commands = require('./services/commands');
const keyphrases = require('./services/keyphrases');

const Logger = require('@common/utils/logger');
const logger = new Logger(__filename);





CLIENT.on('message', async (msg) => {
    logger.extra({ msg });

    //const chatId = msg.chat.id;
    // send a message to the chat acknowledging receipt of their message
    //bot.sendMessage(chatId, 'Received your message');


    if (msg.text[0] == '/') {
        await commands.checkCommand(msg);

    } else {
        await keyphrases.checkKeyphrase(msg);
    }

    // if (msg.author != client.user) {
    //     if (msg.content[0] == '/') {
    //         await commands.checkCommand(msg);

    //     } else {
    //         await keyphrases.checkKeyphrase(msg);
    //     }
    // }


});










