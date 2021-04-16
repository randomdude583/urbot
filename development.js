const path = require('path');

const { NODE_ENV = 'development' } = process.env;

require('dotenv').config({
    path: path.resolve(process.cwd(), `env.${NODE_ENV}.secret`),
});

const main = () => {
    require('./src/server');
};

main();
