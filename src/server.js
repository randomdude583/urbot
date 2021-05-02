const { CLIENT, NODE_ENV } = require('./constants');

const commands = require('./services/commands');
const keyphrases = require('./services/keyphrases');

const Logger = require('@common/utils/logger');
const logger = new Logger(__filename);





CLIENT.on('message', async (msg) => {
    logger.extra({ msg });

    logger.info({ 
        chatId:msg.chat.id,
        fromId: msg.from.id,
        message: msg.text,
    })

    if (msg.text[0] == '/') {
        await commands.checkCommand(msg);

    } else {
        await keyphrases.checkKeyphrase(msg);
    }

});










