/* eslint-disable */
/* eslint-disable no-undef */

require('./helpers/initialize');

const { expect } = require('chai');
const data = require('../src/data');
const { joke } = require('../src/errors');


const validJokes = [
    {text: 'This is a test joke! - a', weight: 1},
    {text: 'This is a test joke! - b', weight: 1},
]

const jokeIndicies = [];


describe('Test joke data methods', () => {

    describe('Valid cases', () => {

        it('Create joke', async () => {
            await data.joke.create(validJokes[0]);
            const res = await data.joke.getAll();
            expect(res.some(element => element.text == validJokes[0].text)).to.equal(true);

            res.filter(element => element.text == validJokes[0].text).forEach(element => {
                jokeIndicies.push(element.id);
            });

        });

        it('Create jokes', async () => {
            await data.joke.createMultiple([
                validJokes[1],
                validJokes[1],
            ])
            const res = await data.joke.getAll();
            expect(res.filter(element => element.text == validJokes[1].text).length).to.equal(2);

            res.filter(element => element.text == validJokes[1].text).forEach(element => {
                jokeIndicies.push(element.id);
            });
        });

        // it('get joke', async () => {

        // });

        // it('get all jokes', async () => {

        // });

        it('delete joke', async () => {
            const beforeCount = (await data.joke.getAll()).length;
            await data.joke.remove(jokeIndicies[0]);
            const afterCount = (await data.joke.getAll()).length;

            expect(beforeCount - afterCount).to.equal(1);
            jokeIndicies.shift();
        });

        it('delete jokes', async () => {
            const beforeCount = (await data.joke.getAll()).length;
            await data.joke.removeMultiple(jokeIndicies);
            const afterCount = (await data.joke.getAll()).length;

            expect(beforeCount - afterCount).to.equal(jokeIndicies.length);
        });



    });





    describe('Invalid cases', () => {

    
    });


});