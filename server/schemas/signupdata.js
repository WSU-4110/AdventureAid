const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');


const signupSchema = new Schema({
    
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

const validation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

signupSchema.pre('save', async function(next) {
    try {
        const userObject = {
            email: this.email,
            password: this.password
        };

        await validation.validateAsync(userObject);
        next();
    } catch (err) {
        next(err);
    }
});
module.exports = mongoose.model('User', signupSchema );