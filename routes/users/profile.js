const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(!req.session.UserID) {
        req.flash('error', 'You need to login to see this page.');
        res.redirect('/login');
    } else {
        res.render('profile', {message: `Welcome to your profile, user ${req.session.UserID}`});
    }
});

router.get('/logout', (req, res) => {
    req.session.UserID = null;
    req.flash('success', 'You have succefully logged out!');
    res.redirect('/login');
})

module.exports = router;