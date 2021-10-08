const express = require('express');

const authControl = require('./mainControl');
const router = express.Router();

router.post('/register',authControl.register)

module.exports = router;