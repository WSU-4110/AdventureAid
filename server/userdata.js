const User = require('./schemas/signupdata');
const jwt = require('jsonwebtoken');
const SK = 'HELLO';

const signup = async (req,res) => {
    const {email,password} = req.body;
    let existing;
    try{
        existing = await User.findOne({email});
        if(existing){
            return res.status(400).json({
                message: "User Already exists"
            })
        }
        const user = new User({email,password});
        await user.save();
    }catch(err){
        console.log(err);
    }
    return res.status(200).json({
        message: "Registered Successfully"
    });
}

// const login = async (req,res) => {
//     const {email,password} = req.body;
//     let existing;
//     try{
//         existing = await User.findOne({email});
//         if(!existing){
//             return res.status(400).json({
//                 message: "User not founds"
//             })
//         };
//     }catch(err){
//         console.log(err);
//     }
//     const payLoad = {
//         userEmail:existing.email,
//         userPass: existing.password
//     }
//     const accessToken = jwt.sign(payLoad,SK);
//     return res.status(200).json({
//         message: "Logged in",
//         Token:accessToken});
// }
module.exports = {signup}