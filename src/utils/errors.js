const boom = require('@hapi/boom');

const createErrorFactory = (boomError) => (code, message, details) => {
    const data = {
        code,
        details,
    };

    return boomError(message, data);
};

const badRequest = createErrorFactory(boom.badRequest);
const notFound = createErrorFactory(boom.notFound);
const conflict = createErrorFactory(boom.conflict);
const forbidden = createErrorFactory(boom.forbidden);
const internalError = createErrorFactory(boom.internalError);

// boom.unauthorized() works different than the other errors
// we need to use this style for as custom constructor.
const unauthorized = createErrorFactory((message, data) => new boom(message, { data, statusCode: 401 }));

module.exports = {
    badRequest,
    notFound,
    conflict,
    unauthorized,
    forbidden,
    internalError,
};