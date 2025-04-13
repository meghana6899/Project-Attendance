const pool=require('../configdb/db');
const DataFilled=async(req,res,next)=>{
    if(!req.body){
        return res.status(400).json({message:"no data is present"})
        
    }
    const {first_name,last_name,email,password,confirmpassword}=req.body;
    if(!first_name ||!last_name || !email || !password || !confirmpassword){
        return res.status(400).json({message:'All fields must filled'})
    }
    next();
}

const DataPresent=async(req,res,next)=>{
    const {email}=req.body;
    try{
        const data=await pool.execute('select email from employees where email=?',[email]);
        const data1=await pool.execute('select email from students where email=?',[email]); 

        if(req.body.email===data[0][0].email){
            req.body.table='employees';
            console.log("ruhtwik");
            next();
    
        }else if(req.body.email===data1[0][0].email){
            req.body.table='students';
            next(); 
        }

    }catch(err){
        console.log(err);
        res.json({message:"No data is found as user"})
    }
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

