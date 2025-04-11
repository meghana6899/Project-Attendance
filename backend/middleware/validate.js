const pool=require('../configdb/db');
const DataFilled=(req,res,next)=>{
    if(!req.body){
        return res.status(400).json({message:"no data is present"})

    }
    const {emp_name,email,password,confirmpassword}=req.body;
    if(!emp_name || !email || !password || !confirmpassword){
        return res.status(400).json({message:'All fields must filled'})
    }
    next();


}

const DataPresent=async(req,res,next)=>{
    const {email}=req.body;
    const data =await pool.execute('select email from employees where email=?',[email]);
    next();

}


const validateInfo=(req,res,next)=>{
    const {email,password,confirmpassword}=req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (password !== confirmpassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    next();

}
module.exports={
    DataFilled,
    DataPresent,
    validateInfo

}

