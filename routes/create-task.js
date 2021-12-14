const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const pool = require('../config/db.js');
const dotenv = require("dotenv");
const {checkStatus} = require('../utils/check-status')


dotenv.config();

router.post('/task', async(req, response) => {
    const { mainUrl } = req.body;
    const {email} = req.body;
    let site_status;
    try{
    site_status = await checkStatus(mainUrl);
    } catch(err){
        site_status = false;
        console.log("Website is down or not exist");
    }

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
                pool.query('INSERT INTO sites(mainurl, email, status) VALUES($1, $2, $3) RETURNING *', [mainUrl,email, site_status]).then(results => {
                    
                    return response.status(201).json({
                        "status": "success",
                        "desc": "added the url",
                        "id": results.rows[0].id
                    });
                  })
            }
            else{
            return response.status(403).json({
                "status": "fail",
                "desc": "url already added",
                "data": results.rows[0]
            });
        }
          })
        }
})

module.exports = router;