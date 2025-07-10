const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1]
        if(!token){
            res.status(401).json('No token, Authorization denied')
        }
        try {
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.userId = decode
            next()
        } catch (error) {
            res.json("Token is not valid")
        }
    }else{
        res.status(401).json('No token, Authorization denied')
    }
}


module.exports = authMiddleware