const mysql = require("mysql");
var express = require('express');

const db = mysql.createConnection({
host: 'localhost',
user: 'root', // replace this with your username 
password: '', // replace this with your password... later, we'll move this to a environment variable file
database: 'studenthub',
})



exports.register = (req,res)=>{
    console.log(req.body);

    const {uid,name,email,password} = req.body;

    db.query('SELECT email FROM users WHERE email=?', [email],(error,result)=>{
        if(error){
            console.log(error);
        }

        // there is already an email with that value in our DB
        // to avoid use of same email
        if(result.length>0){
            return res.render('register')

        }

        db.query('INSERT INTO users SET ?', {uid: uid, name: name, email: email, password: password}, (error,results)=>{
            if (error){
                console.log(error);
            }
            else{
                console.log(results);
                return res.render('register')
            }
        })
    }); 


}