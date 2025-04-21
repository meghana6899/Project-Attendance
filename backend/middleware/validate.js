const pool=require('../configdb/db');
const DataFilled=async(req,res,next)=>{
    if(!req.body){
        return res.status(400).json({message:"no data is present"})
        
    }
    console.log(req.body);
    const {first_name,last_name,email,password,confirmPassword}=req.body;
    if(!first_name ||!last_name || !email || !password || !confirmPassword){
        return res.status(400).json({message:'All fields must filled'})
    }
    console.log('sathvikkkkkkkkkkk')
    next();
}



const DataPresent = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const [employeeRows] = await pool.execute('SELECT email FROM employees WHERE email = ?', [email]);
      const [studentRows] = await pool.execute('SELECT email FROM students WHERE email = ?', [email]);
  
      if (employeeRows.length > 0) {
        req.body.table = 'employees';
        console.log("Employee matched");
        return next();
      }
  
      if (studentRows.length > 0) {
        req.body.table = 'students';
        console.log("Student matched");
        return next();
      }
  
      // If email not found in both tables
      console.log('return statement is here')
      return res.status(404).json({ success: false, message: 'Email not found. Ask admin to register you first.' });
  
    } catch (err) {
      console.error("Error in DataPresent middleware:", err);
      return res.status(500).json({ success: false, message: 'Server error while checking user data.' });
    }
  };
  

const validateInfo=(req,res,next)=>{
    const {email,password,confirmPassword}=req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });

    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    

    next();

}
module.exports={
    DataFilled,
    DataPresent,
    validateInfo

}

