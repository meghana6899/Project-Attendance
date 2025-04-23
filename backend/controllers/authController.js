const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const {secret, expiresIn} = require('../configdb/jwtConfig.js');
const {resetPasswordLink,resetPasswordNow} = require('../models/resetPasswordLink');
const { link } = require('../routes/employeeDetailsRoute.js');




const login = async(req,res) => {
    const {email, password, role} = req.body;
    console.log(email);
    
    

    userModel.findUser(email, async(err, user) => {
        console.log(user);
        console.log("Error",err)
        if(err) return res.status(500).json({
            success: false,
            msg: 'DB error'
        });

        if(!user) return res.status(401).json({
            success: false,
            msg : 'User Not Found'
        });
       //console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        
        if(!isMatch) return res.status(401).json({
            success: false,
            msg: 'Invalid password',

        });
        const id = user.emp_id || user.stu_id;
        console.log(user.role, user.id)
        if(!user.role){
            user.role = "student"
        }
        const token = jwt.sign({userId : user.id, role: user.role}, secret, {expiresIn});
        console.log('Now: ', token)
        res.json({ success: true, token, role: user.role,id: id,  passwordreset: user.first_login});

    })
}

const forgetPassword=async(req,res)=>{
    const { email ,user_id} = req.body;
    if(!email) return res.status(400).json({
        success: false,
        msg: 'Please provide email'
    });
    try{
        const response=await resetPasswordLink(email,user_id);
        if(response.success){
            return res.status(200).json({
                success: true,
                msg: 'Reset password link sent to your email',
                link: response.link
            }); 
    }else{
        return res.status(400).json({
            success: false,
            msg: 'Error sending reset password link'
        });
    }}catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: 'Server error'
        });
    }
    

}

const resetpassword=async(req,res)=>{
    const {token,password}=req.body;
    if(!token) return res.status(400).json({
        success: false,
        msg: 'Please provide token'
    });
    if(!password) return res.status(400).json({
        success: false,
        msg: 'Please provide password'
    });
    try{
        const response=await resetPasswordNow(token,password);
        if(response.success){
            return res.status(200).json({
                success: true,
                msg: 'Password updated successfully'
            });
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: 'Server error'
        });
    }


}

const resetPasswordLoad = (req, res) => {
    const email = req.body.email;
    try {
        userModel.setResetPassword(email, (err, user) => {
            if(err){
                return res.status(500).send({
                    success: false,
                    message: "DB Error"
                })
            }
            if(!user){
                return res.status(404).send({
                    success:false,
                    message: "User not found"
                })
            }
            return res.status(200).send({
                success: true,
                message: "success"
            })
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error
        })
    }
}


module.exports = {
    login,
    forgetPassword,
    resetpassword, resetPasswordLoad
};  










