const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const ConstantKeys = require('../constant/KEYS');
const verifiedJWT = (req,res,next)=>{
    // console.log(req.headers);
    // res.send(req.headers)

    try {
        const token = req?.headers['authorization'];
        if(!token.startsWith("Bearer ")){
            throw new ApiError(httpStatus.UNAUTHORIZED,'Not Authenticate');
        }

        const auth = token.split('Bearer ')[1];
        const verifyUser = jwt.verify(auth,ConstantKeys.JWT_KEY);

        // res.send(verifyUser)

        req.user = verifyUser.userId;
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = verifiedJWT