const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const {secret, expiresIn} = require('../configdb/jwtConfig.js');



const login = async(req,res) => {
    const {username, password, role} = req.body;
    console.log(username)
   
    const hashedPassword = await bcrypt.hash('test123', 10)

    userModel.findUser(username,role, async(err, user) => {
        if(err) return res.status(500).json({msg: 'DB error'});

        if(!user) return res.status(401).json({msg : 'User not found'});
       //console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return res.status(401).json({hashedPassword, msg: 'Invalid password'});

        console.log(user.Role)
        if(!user.Role){
            user.Role = "student"
        }
        const token = jwt.sign({userId : user.id, role: user.Role}, secret, {expiresIn});
        console.log('Now: ', token)
        res.json({token, role: user.Role});
    })
}

module.exports = {login}


