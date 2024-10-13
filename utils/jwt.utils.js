const jwt = require('jsonwebtoken');
const ConstantKeys = require('../constant/KEYS');
const GenerateToken = async (user)=>{
    const token = await jwt.sign({userId:user.id},ConstantKeys.JWT_KEY,{
        expiresIn:'1d'
    });
    return token;
}

module.exports = GenerateToken;
