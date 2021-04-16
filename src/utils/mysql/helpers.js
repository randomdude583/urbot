const boom = require('@hapi/boom');

const { chunkArray } = require('../common');

const TIMESTAMP_COLUMNS = ['created_at', 'updated_at', 'deleted_at'];

const chunkInsert = async (fn, array) => {
    // The maximum number of placeholders for values in a prepared statement is the maximum value of a 16-bit unsigned integer, or specfically: 65,536.
    const size = Math.floor(65536 / array[0].length * 0.90);
    const chunks = chunkArray(array, size);
    await Promise.all(chunks.map((chunk) => fn(chunk)));
};

const throwNotFound = (rows, message = 'Not Found') => {
    if (!rows || rows.length <= 0 || !rows[0]) {
        throw boom.boomify(new Error(message), { statusCode: 404, message: 'Not Found' });
    }
};

const isDuplicateEntryError = (error) => error && error.code === 'ER_DUP_ENTRY';

const isValidationError = (error) => error && error.code === 'ER_BAD_NULL_ERROR';

const convertCustomValues = (o) => {
    Object.keys(o).forEach((key) => {
        let k = key.toLowerCase();
        if (k.startsWith('json_') || k.endsWith('_json')) {
            try {
                o[key] = JSON.parse(o[key]);
            } catch (error) {
                console.log(`Unable to JSON.parse(${key})`, error);
            }
        } else if (k.endsWith('_list')) {
            // convert lists of ids to array of ids
            try {
                let _k = key.replace('_list', '');
                o[_k] = o[key] ? o[key].split(',') : [];
                delete o[key];

                if (_k.endsWith('_ids')) {
                    o[_k] = o[_k].map((id) => parseInt(id));
                }
            } catch (error) {
                console.log(`Unable to .split(',') ${key}`), error;
            }
        } else if (k.endsWith('_at')) {
            try {
                if (o[key]) {
                    o[key] = new Date(o[key]).getTime();
                }
            } catch (error) { }
        }
    });
    return o;
};

const convertDatesToStrings = (o) => {
    Object.keys(o).forEach((key) => {
        let k = key.toLowerCase();
        if (k.endsWith('_at')) {
            try {
                if (o[key]) {
                    o[key] = new Date(o[key]).toISOString().slice(0, 19).replace('T', ' ');
                }
            } catch (error) { }
        }
    });
    return o;
};

const parseObjFields = (obj, custom = true, dateStr = false) => {

    if (custom) {
        obj = convertCustomValues(obj);
    }

    if (dateStr) {
        obj = convertDatesToStrings(obj);
    }

    return obj;
};

const parseArrayOfObjFields = (array, custom = true, dateStr = false) => array.map((obj) => parseObjFields(obj, custom, dateStr));

module.exports = {
    chunkInsert,
    throwNotFound,
    parseArrayOfObjFields,
    parseObjFields,
    isDuplicateEntryError,
    isValidationError,
    TIMESTAMP_COLUMNS,
};