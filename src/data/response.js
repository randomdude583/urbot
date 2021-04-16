// SELECT * FROM keyphrase_response_ref AS ref 
// LEFT JOIN response ON ref.response_id = response.id
// WHERE keyphrase_id = 3;
const errors = require('../errors');

const db = require('../utils/mysql');
const { throwNotFound, parseArrayOfObjFields, parseObjFields } = require('../utils/mysql/helpers');



const TABLE = 'response';
const COLUMNS = [
    'id',
    'text',
    'image',
    'weight',
    'created_at',
    'updated_at',
    'deleted_at',
]
const REF_TABLE = 'keyphrase_response_ref';
const REF_COLUMNS = [
    'keyphrase_id',
    'response_id',
]



//TODO implement schema validation



const get = async (id) => {
    if (!id) {
        throw errors.response.NOT_FOUND('empty id');
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
        throw errors.response.NOT_FOUND(id);
    }
};

const getAll = async (keyphraseId = false) => {

    const stmt = `
    SELECT 
        ${COLUMNS.join()}
    FROM 
        ${TABLE}
    ${keyphraseId ? `RIGHT JOIN ${REF_TABLE} AS ref ON ref.response_id = response.id WHERE keyphrase_id = ${keyphraseId}` : ''}
    `;

    const result = await db.read.query(stmt);

    return parseArrayOfObjFields(result);

};



module.exports = {
    get,
    getAll,
}