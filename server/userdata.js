const User = require('./schemas/signupdata');
const jwt = require('jsonwebtoken');
const SK = 'HELLO';
const bcheck = require('./api/bcheck');

/*
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
        let hashedPassword = await bcheck.hash(password);
        const user = new User({email,password:hashedPassword});
        await user.save();
    }catch(err){
        console.log(err);
    }
    return res.status(200).json({
        message: "Registered Successfully"
    });
}
*/


const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User Already exists" });
        }

        const hashedPassword = await bcheck.hash(password);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        return res.status(200).json({ message: "Registered Successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error during user registration" });
    }
};

const loginuser = async (req,res) => {
    const {email,password} = req.body;
    let existing,checkpassword;
    try{
        existing = await User.findOne({email});
        if(!existing){
            return res.status(400).json({
                message: "User not founds"
            })
        }
        checkpassword = await bcheck.compare(password, existing.password);
        if (!checkpassword) {
            return res.status(401).json({ message: "Username and Password not match" });
        }
        const payLoad = {
            userEmail:existing.email,
            userPass: existing.password
        }
        const accessToken = jwt.sign(payLoad,SK,{ expiresIn: '1h' });
        return res.status(200).json({
            message: "Logged in",
            Token:accessToken});
    }catch(err){
        console.log(err);
    }
    
}
module.exports = {signup,loginuser}