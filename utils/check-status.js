const fetch = require('node-fetch');


// check the current status of the website
async function checkStatus(mainUrl){
    let res = await fetch(mainUrl)
    let statusCode = res.status;

    if(statusCode==200){
        
        return true;
    }
    return false;
}

exports.checkStatus = checkStatus;