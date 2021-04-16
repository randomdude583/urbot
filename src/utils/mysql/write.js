const db = require('./database');

const {
    MYSQL_WRITE_HOST,
    MYSQL_WRITE_USER,
    MYSQL_WRITE_DATABASE,
    MYSQL_WRITE_PASSWORD,
    MYSQL_WRITE_PORT,
} = require('../../constants');

db.init({
    host: MYSQL_WRITE_HOST,
    user: MYSQL_WRITE_USER,
    password: MYSQL_WRITE_PASSWORD,
    port: MYSQL_WRITE_PORT,
    database: MYSQL_WRITE_DATABASE,
    timezone: 'utc',
});

module.exports = {
    query: db.query,
    destroy: db.destroy,
};