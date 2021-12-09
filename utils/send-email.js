const dotenv = require('dotenv');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const sender = process.env.SENDER_EMAIL;


dotenv.config();
const domain = process.env.EMAIL_HOST_DOMAIN;
const api_key = process.env.EMAIL_API_KEY;
const client = mailgun.client({
    username: 'noreply',
    key: api_key,
    host: "api.mailgun.net"
});
let subject;

async function sendEmail(row, type){
    if(type == "down"){
        body = `${row.mainurl} is currently down! Do not forget to let your users know about maintenance process.`;
        subject ="Website Is Currently Down!";
    }
    else{
        body = `Congrats! Seems like you have successfully resolved all the issues. ${row.mainurl} is now up and running.`;
        subject =  "Website Is Now Up and Running Again!";
    }

    let email_data = {
        from: sender,
        to: row.email,
        subject: subject,
        text : body
    }
    
    try{
        client.messages.create(domain, email_data)
        .then((_) => {
            console.log("Email sent successfully");
        })
        .catch((err) => {
            console.error(err);
        });
    } catch(err){
        console.log(err);
    }
}

exports.sendEmail = sendEmail;