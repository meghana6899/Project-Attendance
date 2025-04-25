const pool = require('../configdb/db');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const resettoken='sdgfnjasngkasngadrghaghadhadhadfbdafh';
const bcrypt = require('bcrypt');

const resetPasswordLink = async (email,user_id) => {
    console.log('here is the reset password link')
    console.log(email,user_id)
   
    let table;
    if(user_id.charAt(0)==='E'){
        table='employees';
    } else {
        table='students';
    }
    const [row]=await pool.execute(`select * from ${table} where email=?`,[email]);
    if(row.length===0){
        return {
            success: false,
            msg: 'Email not found'
        };
    }
    const resetToken=jwt.sign({id:user_id,email:email}, resettoken, { expiresIn: '10m' });
    const link=`http://localhost:5173/resetpassword?token=${resetToken}`; // Updated to use 'token' as the query parameter

     let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, // true for 465, false for other ports
            auth: {
                user: 'ruthwikarya23@gmail.com',  // need to add the email address here
                pass: 'orie wseo yida hgmt', //  need to add the password here
            },
        });
    
    
        let info = await transporter.sendMail({
            from: '"Ruthwik Kumar" <ruthwikarya23@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: 'Here You Go! Reset Password Link', // Subject line
            text: `Here is  Your reset password link: ${link}`, // plain text body
            html: `<b>Here is  Your reset password link: ${link}</b>` // html body
            
        });
        console.log("Message sent: %s", info.messageId);
        return {success:true,msg:'Reset password link sent to your email',link:link};
    }



    const resetPasswordNow=async(token,password)=>{
        const decoded=jwt.verify(token,resettoken);
        const user_id=decoded.id;
        const email=decoded.email;
        let table;
        if(user_id.charAt(0)==='E'){
            table='employees';
        } else {
            table='students';
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [row]=await pool.execute(`update ${table} set password=? where email=?`,[hashedPassword,email]);
        if(row.affectedRows===0){
            return {
                success: false,
                msg: 'Error updating password',
                
            };
        }
        return {
            success: true,
            msg: 'Password updated successfully',
            email : decoded.email
        };
    }
module.exports={resetPasswordLink, resetPasswordNow};
    