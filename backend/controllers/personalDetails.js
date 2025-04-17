const express=require('express');
const pool=require('../configdb/db');


const AllEmployees=async(req,res)=>{
    const [row]=await pool.execute('select emp_id,first_name,last_name,email,join_date,role from employees',[]);
    res.send(row);
    
}
const AllStudents=async(req,res)=>{
    const [row]=await pool.execute('select stu_id,first_name,last_name,email,join_date,role from students',[]);
    res.send(row);
    
    
}
module.exports={
    AllEmployees,
    AllStudents,

};