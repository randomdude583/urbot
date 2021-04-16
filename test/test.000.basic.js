/* eslint-disable */
/* eslint-disable no-undef */

require('./helpers/initialize');

// const chai = require('chai');
// const request = require('supertest');
// const { expect } = chai;

const fs = require('fs');

const services = require('../src/services');
//const helpers = require('../src/helpers');
const path = require('path');
const axios = require('axios').default;

const data = require('../src/data');





describe('Test Methods', () => {

    it('Test command', async () => {

        // services.interpret('/learn');
        // services.interpret('/triggers');
        // services.interpret('/tellFamily');
        // services.interpret('/setBirthday');
        // services.interpret('/listBirthdays');
        //await services.interpret('/joke');

        //services.interpret('Good morning katie pie!')


        console.log(await data.response.getAll(1));

    });

   

});