const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const pool = require('../config/db.js');
const dotenv = require("dotenv");


dotenv.config();

router.post('/task', async(req, response) => {
    const { mainUrl } = req.body;
    const {email} = req.body;
    if(!validUrl.isUri(mainUrl)) {
        return response.status(422).json("Invalid Url");
    }

    else{

        query_config = {
            name: 'fetch-url',
            text: 'SELECT * FROM sites WHERE mainurl = $1',
            values: [mainUrl],
        }
        pool.query(query_config, (error, results) => {

            if (error) {
                console.log(error.message);
            }

            if (results.rows==false){
                console.log("Here");
                pool.query('INSERT INTO sites(mainurl, email) VALUES($1, $2)', [mainUrl,email], (error, results) => {
                    if (error) {
                        console.log(error.message);
                    }
                    
                    return response.status(201).json({
                        "status": "success",
                        "desc": "added the url",
                        "id": results.insertId
                    });
                  })
            }
            return response.status(403).json({
                "status": "fail",
                "desc": "url already added",
                "data": results.rows
            });
          })
        }
})

module.exports = router;