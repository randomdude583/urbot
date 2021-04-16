const { notFound } = require('../utils/errors');

const NOT_FOUND = (id) => notFound('PersonNotFound', `Unable to find the given person "${id}".`);


module.exports = {
    NOT_FOUND,
};