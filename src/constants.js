
const triggers = [
    { key: 'babies', id: 0, freq: 1 },
    { key: 'pie', id: 1, freq: 1 },
    { key: 'football', id: 2, freq: 1 },
    { key: 'Wine', id: 3, freq: 1 },
    { key: 'Ethel', id: 4, freq: 1 },
    { key: 'pants', id: 5, freq: .2 },
    { key: 'pesky', id: 6, freq: .2 },
    { key: 'katie', id: 7, freq: .5 },
    { key: 'love', id: 8, freq: 1 },
    { key: 'minnesota', id: 9, freq: 1 },
];


const {
    PORT = 3000,

    NODE_ENV = 'development',

    MYSQL_HOST,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_PORT = 3306,
    MYSQL_CONNECTIONS = 25,

    // read write specific configs, default to single
    MYSQL_READ_HOST = MYSQL_HOST,
    MYSQL_READ_DATABASE = MYSQL_DATABASE,
    MYSQL_READ_USER = MYSQL_USER,
    MYSQL_READ_PASSWORD = MYSQL_PASSWORD,
    MYSQL_READ_PORT = MYSQL_PORT,
    MYSQL_READ_CONNECTIONS = MYSQL_CONNECTIONS,
    MYSQL_WRITE_HOST = MYSQL_HOST,
    MYSQL_WRITE_DATABASE = MYSQL_DATABASE,
    MYSQL_WRITE_USER = MYSQL_USER,
    MYSQL_WRITE_PASSWORD = MYSQL_PASSWORD,
    MYSQL_WRITE_PORT = MYSQL_PORT,
    MYSQL_WRITE_CONNECTIONS = MYSQL_CONNECTIONS,

    MYSQL_VALIDATION_QUERY = 'SHOW TABLES',

    MAX_PAYLOAD_BODY = '50mb',

    DISCORD_TOKEN,

    TZ = 'America/Chicago',

} = process.env;

const ROLES = {
    LOG_READ: { id: 1, name: 'Log Read' },
    LOG_WRITE: { id: 2, name: 'Log Write' },
    LOG_DELETE: { id: 3, name: 'Log Delete' },
};


module.exports = {
    PORT,

    NODE_ENV,

    MYSQL_READ_HOST,
    MYSQL_READ_DATABASE,
    MYSQL_READ_USER,
    MYSQL_READ_PASSWORD,
    MYSQL_READ_PORT,
    MYSQL_READ_CONNECTIONS,

    MYSQL_WRITE_HOST,
    MYSQL_WRITE_DATABASE,
    MYSQL_WRITE_USER,
    MYSQL_WRITE_PASSWORD,
    MYSQL_WRITE_PORT,
    MYSQL_WRITE_CONNECTIONS,

    MYSQL_VALIDATION_QUERY,

    MAX_PAYLOAD_BODY,

    ROLES,

    DISCORD_TOKEN,

    TZ,


    triggers,
};