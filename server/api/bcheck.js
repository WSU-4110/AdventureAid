const bcrypt = require('bcryptjs');

async function hash(password){
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hashSync(password);
        return hashedPassword;
    }catch(err){
        console.log(err);
    }
}

async function compare(password,userPassword){
    let unhashedPassword;
    try{
        unhashedPassword = await bcrypt.compareSync(password,userPassword);
        if(unhashedPassword) console.log('Correct password');
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    hash,
    compare
}
