const db = require('./database');

const {
    MYSQL_READ_HOST,
    MYSQL_READ_USER,
    MYSQL_READ_DATABASE,
    MYSQL_READ_PASSWORD,
    MYSQL_READ_PORT,
} = require('../../constants');

db.init({
    host: MYSQL_READ_HOST,
    user: MYSQL_READ_USER,
    password: MYSQL_READ_PASSWORD,
    port: MYSQL_READ_PORT,
    database: MYSQL_READ_DATABASE,
    timezone: 'utc',
});

module.exports = {
    query: db.query,
    destroy: db.destroy,
};