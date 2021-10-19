const express = require('express');
const connection = require('../../connection');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {message: req.flash('error'), message2: req.flash('success')})
});

router.post('/', (req, res) => {

    const {ID, password} = req.body;
    const sql = `SELECT password from Users WHERE UserID=?`;

    connection.query(sql, ID, async (err, result) => {
        if(err) return err;
        
        if(!result[0]) {
            req.flash('error', 'Invalid username or password!');
            return res.redirect('/login');
        } else {
            let pwd = result[0].password;
       
        const correct = await bcrypt.compare(password, pwd).catch(err => { console.log(err); })

            if(correct) {
                console.log(`ID is: ${ID} and pwd entered: ${password}, and pwd from database: ${pwd}`);
                req.session.UserID = ID;
                res.redirect('/profile');
            }
        }
    });
});

module.exports = router;