const { DISCORD_TOKEN } = require('./constants');

const commands = require('./services/commands');
const keyphrases = require('./services/keyphrases');

const Logger = require('@common/utils/logger');
const logger = new Logger(__filename);

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    logger.extra();
    logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
    logger.extra({ msg });

    if (msg.author != client.user) {
        if (msg.content[0] == '/') {
            await commands.checkCommand(msg);

        } else {
            await keyphrases.checkKeyphrase(msg);
        }
    }

});

client.login(DISCORD_TOKEN);