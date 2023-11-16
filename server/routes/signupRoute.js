const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {signup} = require('../userdata');
const { loginuser } = require('../userdata');


router.post('/signup',signup);
router.post('/loginuser',loginuser);

router.get('/signupdata',(req,res)=>{
    res.send('Hello World');
});

router.get('/logindata',(req,res)=>{
    res.send('Hello Login');
});
module.exports = router;
