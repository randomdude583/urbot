const jwt = require('../../src/utils/jwt');
const { ROLES } = require('../../src/constants');

const getAccessToken = (roles = [ROLES.LOG_DELETE.id, ROLES.LOG_READ.id, ROLES.LOG_WRITE.id]) => jwt.getAccessToken({ id: 1, name: 'Test User', email: 'test@user.com', roles, isAccess: true });

module.exports = {
    getAccessToken
};