const express = require('express');
const mysql = require('mysql');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let connection = mysql.createConnection({
host: 'localhost',
user: 'tara', // replace this with your username 
password: 'tarakhanal', // replace this with your password... later, we'll move this to a environment variable file
database: 'StudentHub',
});

connection.connect(err => {
    if(err)
        throw err.message;

    console.log("Database connection established successfully!");
});

app.get('/', (req, res) => {
    res.send("Welcome to the home page!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
})

connection.end(err => {
    if(err){
        throw err.message();
    }
})
