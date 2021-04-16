const data = require('../data');
const helpers = require('../helpers');
const commands = require('./commands');


//TODO add cooldown


const checkKeyphrase = async (msg) => {

    const phrases = await data.keyphrase.getAll();

    let matches = []

    phrases.forEach(phrase => {
        if (msg.content.includes(phrase.phrase)) {
            matches.push(phrase);
        }
    });

    matches = helpers.shuffle(matches);
    for (let i = 0; i < matches.length; i++) {
        if (Math.random() < matches[i].freq) {
            const responses = await data.response.getAll(matches[i].id);

            if(responses.length > 0){
                //Pick one based on weight
                array = [];
                responses.forEach(response => {
                    for (var i = 0; i < response.weight; i++) {
                        array.push(response);
                    }
                });

                const response = array[Math.floor(Math.random() * array.length)];

                //Handle command based responses
                if(response.text[0] === '/'){
                    msg.content = response.text;
                    await commands.checkCommand(msg);
                } else {
                    let files = []
                    if(response.image) files.push(response.image);
                    msg.channel.send(response.text, {files});
                }
                
                break;
            }
        }
    }

}





module.exports = {
    checkKeyphrase,
};