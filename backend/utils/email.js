const nodemailer = require('nodemailer');
require('dotenv').config()
const sendEmail = (email, subject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS
            }
        })
        const emailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject:subject,
            html: content
        }
        transporter.sendMail(emailOptions, function(error, info){
            if(error){
                console.log(error)
            }else {
                console.log("Mail Sent", info.response)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
    

    
}

module.exports = sendEmail 