const schedule = require('node-schedule');
const {fetchAllEntities} = require('./utils/fetch-all');
const {checkStatus} = require('./utils/check-status');
const {getStatus} = require('./utils/get-status');
const {sendEmail} = require('./utils/send-email');
const pool = require('./config/db.js');
const dotenv = require('dotenv');

dotenv.config();

schedule.scheduleJob('*/5 * * * * *', main)

async function main(){
    let rows = await fetchAllEntities();
    rows.forEach(row => {
        checkStatus(row.mainurl).then(currentStatus => {
            getStatus(row.id).then(recentStatus => {
                if (recentStatus != currentStatus){
                    console.log(recentStatus, currentStatus);
                    if(!currentStatus){
                         // send down email
                        sendEmail(row, "down");
                    }
                    else{
                        // send up & and running email
                        sendEmail(row, "up");
                    }
                    // update db recentStatus=currentStatus
                    pool.query(`UPDATE sites SET status = ${currentStatus} WHERE id = ${row.id}`)
                        console.log(`updated ${row.id}`);
                    
                } 
            })
            return currentStatus;
        })
    })
}

// main();