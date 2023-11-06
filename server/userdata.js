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
module.exports = {signup}