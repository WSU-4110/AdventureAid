const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    }
});

const User = new mongoose.model('User', signupSchema );
module.exports = User;