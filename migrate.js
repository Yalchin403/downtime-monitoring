const db = require('./config/db');


(async () => {
  try {
    
    // we can also add code snippet to check if we have sites table already
    // if so, delete it and recreate it 
    await db.query("CREATE TABLE sites(id SERIAL PRIMARY KEY,mainurl VARCHAR(200) NOT NULL,email VARCHAR(40) NOT NULL,status BOOLEAN NOT NULL)")
    console.log("created the table")
  } catch (err) {
    console.log(err)
    
  }
})()