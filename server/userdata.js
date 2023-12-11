const User = require('./schemas/signupdata');
const jwt = require('jsonwebtoken');// needs to import json for the token, every user has unique token
const SK = 'HELLO';
const bcheck = require('./api/bcheck');


const signup = async (req,res) => {
    const {email,password} = req.body;
    let existing;
    try{
        existing = await User.findOne({email}); // mongodb function that checks if user is already in database or not.
        if(existing){
            return res.status(400).json({
                message: "User Already exists"
            })
        }
        let hashedPassword = await bcheck.hash(password); //password will store in hashed form
        const user = new User({email,password:hashedPassword});
        await user.save();
    }catch(err){
        console.log(err);
    }
    return res.status(200).json({
        message: "Registered Successfully"
    });
}

const loginuser = async (req,res) => { //login function will also check the user.
    const {email,password} = req.body;
    let existing,checkpassword;
    try{
        existing = await User.findOne({email});
        if(!existing){
            return res.status(400).json({
                message: "User not founds"
            })
        }
        checkpassword = await bcheck.compare(password, existing.password); //function will verify the original and hashed password are same before entering.
        if (!checkpassword) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const payLoad = {
            userEmail:existing.email,
            userPass: existing.password,
            userId:existing._id
        };
        const accessToken = jwt.sign(payLoad,SK,{ expiresIn: '1h' });
        return res.status(200).json({
            message: "Logged in",
            Token:accessToken,
            userId: existing._id
        });
    }catch(err){
        console.log(err);
    } 
}
    const userdelete = async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
    
            // make sure the user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Delete the userwith userID
            await User.deleteOne({ _id: userId });
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting user" });
        }
    }
   
module.exports = {signup,loginuser,userdelete}