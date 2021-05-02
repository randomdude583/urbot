const dateFormat = require('dateformat');

const { CLIENT, PRIMARY_CHAT_ID, ADMIN_TELEGRAM_ID } = require('../constants');

const Logger = require('@common/utils/logger');
const logger = new Logger(__filename);

const data = require('../data');


const learn = (msg) => {
    logger.extra({ msg });
};

const getChatId = async (msg) => {
    logger.extra({ msg });

    if(ADMIN_TELEGRAM_ID){
        CLIENT.sendMessage(ADMIN_TELEGRAM_ID, msg.chat.id);
    }
}

// Done
const listTriggers = async (msg) => {
    logger.extra({ msg });

    const triggers = await data.keyphrase.getAll();

    let out = 'Triggers: \n';
    let i = 1;
    triggers.forEach((trigger) => {
        out += `${i}: ${trigger.phrase}\n`;
        i++;
    });

    CLIENT.sendMessage(msg.chat.id, out);
};

const tellFamily = (msg) => {
    logger.extra({ msg });

    if(msg.from.id == ADMIN_TELEGRAM_ID){
        //TODO ask for confirmation
        console.log('primary chat id: ', PRIMARY_CHAT_ID);
        if(PRIMARY_CHAT_ID){
            CLIENT.sendMessage(PRIMARY_CHAT_ID, msg.text.substr(msg.text.indexOf(' ')+1));
            CLIENT.sendMessage(msg.chat.id, 'Sent!');
        } else {
            CLIENT.sendMessage(msg.chat.id, 'No Primary ChatID!');
        }
    }
};

const setBirthday = (msg) => {
    logger.extra({ msg });
};


// Done
const listBirthdays = async (msg, count=5) => {
    logger.extra({ msg });

    const people = await data.person.getAll();

    const currentYear = new Date().getFullYear();
    const curTime = new Date();
    curTime.setHours(0,0,0,0);

    people.forEach((person) => {
        person.birthday.setYear(currentYear);
        if (person.birthday < curTime) {
            person.birthday.setYear(currentYear + 1);
        }
    });

    people.sort((a, b) => {
        if (a.birthday - curTime > b.birthday - curTime) {
            return 1;
        } else {
            return -1;
        }
    });
    
    let out = '';
    for (let i=0; i<people.length; i++) {
        if (i >= count) {
            break;
        }
        out += `${people[i].first_name}: ${dateFormat(people[i].birthday, 'mmm dS')}\n`;

    }

    CLIENT.sendMessage(msg.chat.id, out);
};


// Done
const nextBirthday = async (msg) => {
    logger.extra({ msg });

    await listBirthdays(msg, 1);
};


// Doneish
const joke = async (msg) => {
    logger.extra({ msg });
    
    const jokes = await data.joke.getAll();

    let array = [];
    jokes.forEach((joke) => {
        for ( var i=0; i<joke.weight; i++ ) {
            array.push(joke.text);
        }
    });

    CLIENT.sendMessage(msg.chat.id, array[Math.floor(Math.random() * array.length)]);
};


const checkCommand = async (msg) => {
    logger.extra({ msg });
    const command = msg.text.toLowerCase();


    if (command.includes('/learn')) {
        learn(msg);

    } else if (command.includes('/getchatid')) {
        await getChatId(msg);

    } else if (command.includes('/triggers')) {
        await listTriggers(msg);
        
    } else if (command.includes('/tellfamily')) {
        await tellFamily(msg);

    } else if (command.includes('/setbirthday')) {
        await setBirthday(msg);

    } else if (command.includes('/listbirthdays')) {
        await listBirthdays(msg, 3);

    } else if (command.includes('/nextbirthday')) {
        await nextBirthday(msg);

    } else if (command.includes('/joke')) {
        await joke(msg);

    } else {
        logger.debug('no command');
    }

};


module.exports = {
    checkCommand,
};