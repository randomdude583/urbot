const dateFormat = require("dateformat");

const data = require('../data');

const checkCommand = async (msg) => {
    command = msg.content.toLowerCase();


    if(command.includes('/learn')){
        learn(msg);

    } else if(command.includes('/triggers')){
        listTriggers(msg);
        
    } else if(command.includes('/tellfamily')){
        await tellFamily(msg);

    } else if(command.includes('/setbirthday')){
        await setBirthday(msg);

    } else if(command.includes('/listbirthdays')){
        await listBirthdays(msg, 3);

    } else if(command.includes('/nextbirthday')){
        await nextBirthday(msg);

    } else if(command.includes('/joke')){
        await joke(msg);

    } else {
        console.log('no command');
    }

}






const learn = (msg) => {
    console.log('learn!')
}

//Done
const listTriggers = async (msg) => {
    const triggers = await data.keyphrase.getAll();

    let out = "Triggers: \n";
    let i = 1;
    triggers.forEach(trigger => {
        out += `${i}: ${trigger.phrase}\n`
        i++;
    });

    msg.channel.send(out);
}

const tellFamily = async (msg) => {
    //Authenticate sender
    //Get family chat ID from db
    //Send given message
    //TODO ask for confirmation
    console.log(msg.content.substr(msg.content.indexOf(' ')+1));
    msg.channel.send('Sent!')
}

const setBirthday = (msg) => {
    console.log('setBirthday!')
}



//Done
const listBirthdays = async (msg, count=5) => {
    const people = await data.person.getAll();

    const currentYear = new Date().getFullYear();
    const curTime = new Date();
    curTime.setHours(0,0,0,0);

    console.log(curTime);
    people.forEach((person) => {
        person.birthday.setYear(currentYear);
        if(person.birthday < curTime){
            person.birthday.setYear(currentYear + 1);
        }
        console.log(person.birthday);
    })

    people.sort((a, b) => {
        if(a.birthday - curTime > b.birthday - curTime){
            return 1;
        } else {
            return -1;
        }
    });
    
    let out = "";
    for(let i=0; i<people.length; i++){
        if(i >= count){
            break;
        }
        out += `${people[i].first_name}: ${dateFormat(people[i].birthday, "mmm dS")}\n`;

    }

    msg.channel.send(out);
}



//Done
const nextBirthday = async (msg) => {
    await listBirthdays(msg, 1);
}


//Doneish
const joke = async (msg) => {
    const jokes = await data.joke.getAll();

    array = [];
    jokes.forEach(joke => {
        for( var i=0; i<joke.weight; i++ ) {
            array.push(joke.text);
        }
    });

    msg.channel.send(array[Math.floor(Math.random() * array.length)]);
}



module.exports = {
    checkCommand,
}