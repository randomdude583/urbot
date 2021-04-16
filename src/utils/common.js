const { NODE_ENV } = require('../constants');

const chunkArray = (arr, size) => arr.reduce((acc, _, i) => i % size ? acc : [...acc, arr.slice(i, i + size)], []);

const isLocalDevelopment = () => NODE_ENV !== 'staging' && NODE_ENV !== 'production';

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

module.exports = { isValidEmail, isLocalDevelopment, chunkArray };