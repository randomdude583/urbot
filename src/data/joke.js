const errors = require('../errors');

const db = require('../utils/mysql');
const { throwNotFound, parseArrayOfObjFields, parseObjFields } = require('../utils/mysql/helpers');



const TABLE = 'joke';
const COLUMNS = [
    'id',
    'text',
    'weight',
    'created_at',
    'updated_at',
    'deleted_at',
]



//TODO implement schema validation


const get = async (id) => {
    if (!id) {
        throw errors.joke.NOT_FOUND('empty id');
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
        throw errors.joke.NOT_FOUND(id);
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




const createMultiple = async (array) => {
    //let validatedArray = array.map((channel) => validate(channel, schemas.channel));
    let validatedArray = array;

    if (validatedArray.length == 0) {
        return;
    }


    const stmt = `
  INSERT INTO ${TABLE}
    (${COLUMNS.join()})
  VALUES
    ${validatedArray.map(({ weight }) => `(NULL, ?, ${weight ? '?' : 'NULL'}, NOW(), NOW(), NULL)`).join(',')}
  ON DUPLICATE KEY UPDATE
    text = VALUES(text),
    weight = VALUES(weight),
    updated_at = VALUES(updated_at);
  `;

    const params = [];

    validatedArray.forEach(({ text, weight }) => {
        params.push(text);
        params.push(weight);
    });

    await db.write.query(stmt, params);
};

const create = async (joke) => {
    await createMultiple([joke]);
};


const removeMultiple = async (array) => {
    if (array.length == 0) {
        return;
    }

    const stmt = `
  DELETE FROM 
    ${TABLE}
  WHERE
    id 
  IN
    (${array.map(() => '?').join(',')})
  `;


    const params = [];
    array.forEach((id) => {
        params.push(id);
    });

    const result = await db.write.query(stmt, params);

    throwNotFound([result.affectedRows >= 1], 'Unable to find and remove.');
};

const remove = async (id) => {
    await removeMultiple([id]);
};




module.exports = {
    get,
    getAll,
    createMultiple,
    create,
    removeMultiple,
    remove,
}