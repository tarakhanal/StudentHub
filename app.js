const express = require('express');
const mysql = require('mysql');


const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let connection = mysql.createConnection({
host: 'localhost',
user: 'root', // replace this with your username 
password: '', // replace this with your password... later, we'll move this to a environment variable file
database: 'studenthub',
});

app.use(express.json());


connection.connect(err => {
    if(err)
        throw err.message;

    console.log("Database connection established successfully!");
});

app.use('/', require('./routes/pages'));

app.use('/', require('./routes/authentication'));

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
})

connection.end(err => {
    if(err){
        throw err.message();
    }
})

