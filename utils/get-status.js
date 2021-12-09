const pool = require('../config/db.js');


async function getStatus(id){ 
    query_config = {
        name: 'get-status',
        text: 'SELECT * FROM sites WHERE id = $1',
        values: [id],
    }
    let result = await pool.query(query_config)
            if(result){
                let status = results.rows[0].status;
                return status;
            }
}