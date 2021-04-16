const mysql = require('mysql');

const Logger = require('@common/utils/logger');
const logger = new Logger(__filename);

let pool = false;

const getConnection = () => 
// Check for errors;
    new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                switch (error.code) {
                    case 'PROTOCOL_CONNECTION_LOST':
                        logger.error('Connection lost.', error);
                        reject(error);
                        break;
                    case 'ER_CON_COUNT_ERROR':
                        logger.error('Connection closed.', error);
                        reject(error);
                        break;
                    case 'ECONNREFUSED ':
                        logger.error('Database connection was refused.', error);
                        reject(error);
                        break;
                    default:
                        logger.error('Connection error.', error);
                        reject(error);
                }
            }

            resolve(connection);
        });
    })
;

const query = async (stmnt, params) => {
    logger.extra({ stmnt, params });

    const connection = await getConnection();

    return new Promise((resolve, reject) => {
        connection.query(stmnt, params, (error, results) => {
      //eslint-disable-line
            connection.release();
            if (error) {
                logger.error(error);
                reject(error);
            } else if (results) {
                resolve(results);
            }
        });
    });
};

const init = ({ host, database, user, password, port = 3306, timezone = 'utc', connectionLimit = 25, charset = 'utf8mb4_general_ci' }) => {

    const config = { host, database, user, password, port, timezone, charset, supportBigNumbers: true };

    const connection = mysql.createConnection(config);

    connection.query('SHOW TABLES', (error, results) => {
        if (error) {
            logger.error('Unable to establish databse connection:', { host, database, user, port, timezone, connectionLimit }, error);
            throw error;
        } else {
            logger.error('Database connection established:', { host, database, user, port, timezone, connectionLimit }, results);
        }
    });

    connection.end();

    pool = mysql.createPool({ ...config, connectionLimit, multipleStatements: true });
};

const destroy = (callback) => {
    pool.end(callback);
};

module.exports = {
    init,
    query,
    destroy,
};