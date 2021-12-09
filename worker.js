const schedule = require('node-schedule');
const {fetchAllEntities} = require('./utils/fetch-all');
const {checkStatus} = require('./utils/check_status');
const {getStatus} = require('./utils/get-status')


// const sec = 5;
// schedule.scheduleJob('*/5 * * * * *', main)
async function main(){
    let rows = await fetchAllEntities();
    rows.forEach(row => {
        checkStatus(row.mainurl).then(currentStatus => {
            getStatus(row.mainurl).then(recentStatus => {
                if (recentStatus != currentStatus){
                    // update db recentStatus=currentStatus
                    // send email
                } 
            })
            return currentStatus;
        })
    })
}

main();