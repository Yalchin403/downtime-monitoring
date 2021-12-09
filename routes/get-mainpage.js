const express = require('express');
const router = express.Router();
const pool = require('../config/db.js');
const dotenv = require("dotenv");
const fetch = require('node-fetch');


dotenv.config();

router.get('/:id', async(req, response) => {
    try {
        const {id} = req.params;
        
        query_config = {
            name: 'fetch-url',
            text: 'SELECT * FROM sites WHERE id = $1',
            values: [id],
        }
        pool.query(query_config, (error, results) => {
            if(error){
                console.log(error.message);
            }
            if(results.rows != false){
                const mainUrl = results.rows[0].mainurl;
                fetch(mainUrl)
                .then(res => {
                    const statusCode = res.status;
                    if(statusCode==200){
                        
                        return response.status(200).json({
                            "status": "up",
                            "status_code": statusCode
                        });
                    }

                    else{
                        return response.status(200).json({
                            "status": "down",
                            "status_code": statusCode
                        });
                    }
                })
                
            }
            else{
                return response.status(404).json({
                    "status": "fail",
                    "desc": "entry doesnt exist",
                })
            }
        })

    } catch (err){
        console.log(err.message)
    }
})

module.exports = router;