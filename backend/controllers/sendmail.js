const nodemailer = require('nodemailer');

const sendMail=async(req,res)=>{
    const {email,first_name,last_name,user_id}=req.body;
    let testAccount =await nodemailer.createTestAccount();
    // res.send('hello testaccount')
    console.log('hello testaccount')
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // true for 465, false for other ports
        auth: {
            user: 'ruthwikarya23@gmail.com',
        pass: 'orie wseo yida hgmt', // generated ethereal password
        },
    });


    let info = await transporter.sendMail({
        from: '"Ruthwik Arya" <ruthwikarya23@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: 'Account Created in gradious portal',
        text: `Hi ${first_name} ${last_name}, Your account successfully created with the ${email} and password:Grad@123 with user_id :${user_id}`, // plain text body
        html: `<b>Hi ${first_name} ${last_name}, Your account successfully created with the ${email} and password ${'Grad@123'}</b>` // html body
    });
    console.log("Message sent: %s", info.messageId);
    res.json({message:"Mail sent successfully",status:200,info});
}
module.exports=sendMail;