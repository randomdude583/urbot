const {DISCORD_TOKEN} = require('./constants');

const commands = require('./services/commands');
const keyphrases = require('./services/keyphrases')



const Discord = require('discord.js');
const { keyphrase } = require('./data');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

    if(msg.author != client.user){
        if(msg.content[0] == '/'){
            await commands.checkCommand(msg);

        } else {
            await keyphrases.checkKeyphrase(msg);
        }
    }

});

client.login(DISCORD_TOKEN);