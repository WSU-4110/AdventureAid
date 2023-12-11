const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {signup} = require('../userdata');
const { loginuser } = require('../userdata');
const {userdelete} = require('../userdata')
const { getUserProfile } = require('../userdata');

router.post('/signup',signup);
router.post('/loginuser',loginuser);
router.delete('/userdelete/:userId',userdelete);

router.get('/signupdata',(req,res)=>{
    res.send('Hello World');
});

router.get('/logindata',(req,res)=>{
    res.send('Hello Login');
});

// router.get('/userprofile/:userId', async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const userProfile = await getUserProfile(userId);
//       if (userProfile) {
//         res.status(200).json(userProfile);
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "An internal server error occurred" });
//     }
//   });

module.exports = router;
