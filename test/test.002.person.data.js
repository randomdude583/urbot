/* eslint-disable */
/* eslint-disable no-undef */

require('./helpers/initialize');

const { expect } = require('chai');
const data = require('../src/data');
const { joke } = require('../src/errors');


const validPeople = [
    {id: '000000000', first_name: 'Test', last_name: 'A', birthday: ''},
    {id: '111111111', first_name: 'Test', last_name: 'B', birthday: ''},
]



describe('Test person data methods', () => {

    describe('Valid cases', () => {

        it('Create person', async () => {
            

        });

        it('Create people', async () => {
            
        });

        it('get person', async () => {
            res = await data.person.get('asdf5d4d2f42f');

            console.log(res)

        });

        it('get all people', async () => {

        });

        it('delete person', async () => {
           
        });

        it('delete people', async () => {
            
        });



    });





    describe('Invalid cases', () => {

    
    });


});