const pool=require('../configdb/db');
const {active_hours,total_hours,break_hours} =require('../models/avgHoursPerMonth')


const Avg_hours=async(req,res)=>{
    const id=req.params.id;
    if(id.charAt(0)==='E'){
       
        const active=await active_hours('emp_hours','emp_id',id);
        const total=await total_hours('emp_hours','emp_id',id);
        const breakk=await break_hours('emp_hours','emp_id',id);
     
        res.send({active,total,breakk});

    }else{
        const active=await active_hours('stu_hours','stu_id',id);
        const total=await total_hours('stu_hours','stu_id',id);
        const breakk=await break_hours('stu_hours','stu_id',id);
     
        res.send({active,total,breakk});

    }

}
module.exports=Avg_hours;