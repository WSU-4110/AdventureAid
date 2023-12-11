const bcrypt = require('bcryptjs'); // need to install bcrypt if you are running

async function hash(password){ //function
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
//export
module.exports = {
    hash,
    compare
}
