const res = require('express/lib/response');
const pool = require('../config/db.js');

async function fetchAllEntities(){
    let results = await pool.query('SELECT * FROM sites');
    return results.rows;
}

exports.fetchAllEntities = fetchAllEntities;