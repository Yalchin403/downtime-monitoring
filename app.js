const express = require("express");
const dotenv = require("dotenv");
const {pool} = require("./config/db");

dotenv.config();
// set up the app
let PORT = process.env.APP_PORT;
if(!PORT) PORT = 8000;
const app = express();
app.use(express.json());
// define routes
app.use('/api/v1/create', require('./routes/create-task'));
app.use('/api/v1/url/check-status', require('./routes/get-mainpage'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });