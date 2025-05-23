const jwt = require('jsonwebtoken');
const {secret} = require('../configdb/jwtConfig.js');

const authMid = (req, res, next) => {


    let token; 

   



    let authHeader = req.headers.authorization 
    if(authHeader && authHeader.startsWith("Bearer")){
        //console.log(token)
        token = authHeader.split(" ")[1]
       
    }else{
        token = authHeader
    }
 
    if(!token) return res.status(401).json({
        success: false,
        msg : 'Token missing'
    });
    console.log("Token present")
    console.log("Token from middleware",token);
    jwt.verify(token, secret, (err, decoded) => {

        
        if(err) return res.status(403).json({

            success: false,
            msg : 'Token ivalid', 
            error:err.message});
        req.user = decoded;
        //req.user.Role = req.headers.user
        console.log("Token verified")
       
        //req.users = userDetails;
        next();

    })
    
}
module.exports = {authMid}
