const errors = require('../errors');

const Logger = require('@common/utils/logger');
const logger = new Logger(__filename);

const db = require('../utils/mysql');
const { throwNotFound, parseArrayOfObjFields, parseObjFields } = require('../utils/mysql/helpers');


const TABLE = 'keyphrase';
const COLUMNS = [
    'id',
    'phrase',
    'freq',
    'created_at',
    'updated_at',
    'deleted_at',
];

// TODO implement schema validation


const get = async (id) => {
    logger.extra({ id });

    if (!id) {
        throw errors.keyword.NOT_FOUND('empty id');
    }

    const stmt = `
  SELECT 
    ${COLUMNS.join()}
  FROM 
    ${TABLE} 
  WHERE
    id = ?
  `;

    const result = await db.read.query(stmt, id);

    try {
        throwNotFound(result);
        return parseObjFields(result[0]);
    } catch (error) {
        throw errors.keyword.NOT_FOUND(id);
    }
};

const getAll = async () => {
    logger.extra();
    const stmt = `
    SELECT 
      ${COLUMNS.join()}
    FROM 
      ${TABLE};
    `;

    const result = await db.read.query(stmt);

    return parseArrayOfObjFields(result);
};

const createMultiple = () => {
    logger.extra();
    
};

const create = () => {
    logger.extra();
    
};

const removeMultiple = () => {
    logger.extra();
    
};

const remove = () => {
    logger.extra();
    
};

// TODO add methods for creating references


module.exports = {
    get,
    getAll,
    createMultiple,
    create,
    removeMultiple,
    remove,
};
