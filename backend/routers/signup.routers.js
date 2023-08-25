const signup = require('../controllers/signup.controllers')

const express = require('express');
const router  = express.Router(); 


router.post('/signup', signup.signup)
router.post('/verify', signup.verifyOtp)

module.exports = router;