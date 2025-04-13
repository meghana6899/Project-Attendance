const authorizeRoles = (...allowedRoles) => {
    //console.log(req)
    return (req, res, next) => {
        console.log(req.user.role)
        if(!req.user || !req.user.role){
            return res.status(403).json({success: false, msg: "User role missing in token"})
        }
        console.log(allowedRoles)
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({success: false, msg : "Access Denied"})
        }
        
        next();
    }
}


module.exports = authorizeRoles;