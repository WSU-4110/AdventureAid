const bcrypt = require('bcryptjs');

async function hash(password){
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 10); //await function will wait
        return hashedPassword;
    }catch(err){
        console.log(err);
    }
}


async function compare(password,userPassword){
    try{
       return bcrypt.compare(password,userPassword);
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    hash,
    compare
}
