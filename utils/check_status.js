const fetch = require('node-fetch');

async function checkStatus(mainUrl){
    let res = await fetch(mainUrl)
    let statusCode = res.status;

    if(statusCode==200){
        
        return true;
    }
    return false;
}

exports.checkStatus = checkStatus;