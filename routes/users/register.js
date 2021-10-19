const express = require('express');
const connection = require('../../connection');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register')
});

router.post('/', async (req, res) => {

    const {firstName, lastName, email, UNetID, password, confirmPassword} = req.body;
    if(password != confirmPassword) { // Can we handle this in the front-end?
        res.redirect('/register'); // Password doesn't match so reload the same webpage
    } 

    /* 
    /*                                                                        */
    /* Insert logic here to see if USER with particular UNetID already exists */
    /*                                                                        */
    /*                                                                        */

    const hash = await bcrypt.hash(password, 12);
    const sql = `INSERT INTO Users VALUES(${UNetID}, '${firstName}', '${lastName}', '${email}', '${'me.jpg'}', '${hash}')`;
                
    connection.query(sql, (err, result) => {
        if(err) {
            console.log("Something is wrong with the database.");
            return res.redirect('/register');
        }
        else {
            req.session.UserID = UNetID;
            return res.redirect('/profile');
        }
    });
});

module.exports = router;