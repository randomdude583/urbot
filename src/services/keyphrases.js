const data = require('../data');
const helpers = require('../helpers');
const commands = require('./commands');

const { CLIENT } = require('../constants');

const Logger = require('@common/utils/logger');
const logger = new Logger(__filename);


// TODO add cooldown


const checkKeyphrase = async (msg) => {
    logger.extra({ msg });

    const phrases = await data.keyphrase.getAll();

    let matches = [];
    phrases.forEach((phrase) => {
        if (msg.text.toLowerCase().includes(phrase.phrase)) {
            matches.push(phrase);
        }
    });

    matches = helpers.shuffle(matches);
    for (let i = 0; i < matches.length; i++) {
        if (Math.random() < matches[i].freq) {
            const responses = await data.response.getAll(matches[i].id);

            if (responses.length > 0) {
                // Pick one based on weight
                let array = [];
                responses.forEach((response) => {
                    for (var i = 0; i < response.weight; i++) {
                        array.push(response);
                    }
                });

                const response = array[Math.floor(Math.random() * array.length)];

                // Handle command based responses
                if(response.text){
                    if (response.text[0] === '/') {
                        msg.text = response.text;
                        await commands.checkCommand(msg);
                    } else {
                        CLIENT.sendMessage(msg.chat.id, response.text);
                    }
                }
                if(response.image) CLIENT.sendPhoto(msg.chat.id, response.image);
                break;
            }
        }
    }

};


module.exports = {
    checkKeyphrase,
};