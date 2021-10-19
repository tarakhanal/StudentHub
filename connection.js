const express = require('express');
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(err => {
    if(err)
        throw err.message;
    console.log("Database connection established successfully!");
});

module.exports = connection;