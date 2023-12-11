// importing express and other files

const express = require('express');
const router = express.Router();
const {signup} = require('../userdata');
const { loginuser } = require('../userdata');
const {userdelete} = require('../userdata');

//if you are using postman method to test the backend link/router make sure you write same name endpoint after/
//endpoint
router.post('/signup',signup); // for postman testig localhost/signup
router.post('/loginuser',loginuser);
router.delete('/userdelete/:userId',userdelete);

router.get('/signupdata',(req,res)=>{
    res.send('Hello World');
});

router.get('/logindata',(req,res)=>{
    res.send('Hello Login');
});

module.exports = router;
