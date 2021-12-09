const pool = require('../config/db.js');


// check status from db
async function getStatus(id){ 
    query_config = {
        name: 'get-status',
        text: 'SELECT * FROM sites WHERE id = $1',
        values: [id],
    }
    let results = await pool.query(query_config)
    if(results){
        let status = results.rows[0].status;
        return status;
    }
}

exports.getStatus = getStatus;