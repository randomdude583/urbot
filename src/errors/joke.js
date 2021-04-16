const { notFound } = require('../utils/errors');

const NOT_FOUND = (id) => notFound('JokeNotFound', `Unable to find the given joke "${id}".`);


module.exports = {
    NOT_FOUND,
};