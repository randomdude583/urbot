const { notFound, badRequest } = require('../utils/errors');

const NOT_FOUND = (id) => notFound('KeywordNotFound', `Unable to find the given keyword "${id}".`);


module.exports = {
    NOT_FOUND,
};