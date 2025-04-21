const pool=require('../configdb/db');
const bcrypt=require('bcrypt');
const DataCheck=async(req,res,next)=>{
    console.log(req.body)  
    if(!req.body){
        return res.status(400).json({message:"no data is present"})
        
    }
    const {user_id,password}=req.body;
    if(!user_id || !password ){
        return res.status(400).json({message:'All fields must filled'})
    }
    next();
}
const validatetable=(req,res,next)=>{
    const user_id=req.body.user_id; 
    if(user_id.charAt(0)==='E'){
        req.body.table='attendance_emp';
        req.body.authtable='employees';
        // console.log(req.body);
        next();
    }else if(user_id.charAt(0)==='S'){
        req.body.table='attendance_stu';
        req.body.authtable='students';
        // console.log(req.body);
        next();
    }
}


const CheckingUserPresentOrNot=async(req,res,next)=>{
    const {user_id,authtable}=req.body;
    
    if(user_id.charAt(0)==='E'){
        try{
            const [data ]=await pool.execute(`select emp_id from ${authtable} where emp_id = ?`,[user_id]);
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
            
            

            if(data[0].emp_id===user_id){
                console.log('eneter into if block');
                req.body.column='emp_id';
                console.log("RE body", req.body)
                next();
            }else{
                console.log('emp not found')

                
            }
            
        }
        catch(err){
            console.log(err);
            
            res.status(500).send({success: "false",
            message:"User_id is not in the DB or the invalid credentials"});
            
            console.log("data is not found")
            
        }
        
    }else if(user_id.charAt(0)==='S'){
        try{
            const [data ]=await pool.execute(`select stu_id from ${authtable} where stu_id = ?`,[user_id]);
         
            console.log(data)
            if(data[0].stu_id===user_id){
                req.body.column='stu_id';
                
                console.log("data is found and entered else block");
                next();
            }else{
                console.log('not found')
                
            }
    }
catch(err){
    console.log(err);
            
    res.send({message:"User_id is not in the DB or the invalid credentials"});
    
    console.log("data is not found")
}
    }
}
const validatePassword=async(req,res,next)=>{
    
    const {password,authtable,column,user_id}=req.body;
    
    const [pswrd]=await pool.execute(`select password from ${authtable} where ${column}=?`,[user_id]);
    console.log('heri here');

    if(column==='emp_id'){
        console.log(pswrd);

        const isMatched=await bcrypt.compare(password,pswrd[0].password)
            if(isMatched){
                console.log('password is validated');
                next();

            }else{
                return res.status(401).send({success: false, msg: "Incorrect Password"})
                console.log("Incorrect Pasword")
            }

        }


    else if(column==='stu_id'){
        bcrypt.compare(password,pswrd[0].password,(err,res)=>{
            if(res){
                console.log('password is validated');
                next();

            }else{
                return res.status(401).send({success: false, msg: "Incorrect Password"})
                console.log("Incorrect Password")
            }

        })

    }
    else{
        console.log('password is incorrect');
    }



}
module.exports={
    validatetable,
    CheckingUserPresentOrNot,
    DataCheck,validatePassword
}