const errors = require('../errors');

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
]

//TODO implement schema validation


const get = async (id) => {
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
    const stmt = `
    SELECT 
      ${COLUMNS.join()}
    FROM 
      ${TABLE};
    `;

    const result = await db.read.query(stmt);

    return parseArrayOfObjFields(result);
};

const createMultiple = async () => {
    
};

const create = async () => {
    
};

const removeMultiple = async () => {
    
};

const remove = async () => {
    
};

//TODO add methods for creating references





module.exports = {
    get,
    getAll,
    createMultiple,
    create,
    removeMultiple,
    remove,
}


