const express=require('express');
const pool=require('../configdb/db');
const updateUser=require('../models/updateUsers');
const deleteaUser=require('../models/DeleteUser');
const CreateNewUser=require('../models/CreateNewUser');
const bcrypt = require('bcrypt');


const AllEmployees=async(req,res)=>{
    const [row]=await pool.execute('select emp_id,first_name,last_name,email,join_date,role from employees',[]);
    res.send(row);
    
}
const AllStudents=async(req,res)=>{
    const [row]=await pool.execute('select stu_id,first_name,last_name,email,join_date,role from students',[]);
    res.send(row);
    
    
}

// Adjust path accordingly

const Update_user_info = async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, role ,email} = req.body;

  try {
    const isEmp = id.charAt(0) === 'E';
    const table = isEmp ? 'employees' : 'students';
    const column = isEmp ? 'emp_id' : 'stu_id';

    const update = await updateUser(table, column, id, first_name, last_name, role,email);
    if (update.affectedRows > 0) {
        console.log('------success-----')
        res.status(200).json({ message: 'Update successful',status:200 });
      } else {
        res.status(404).json({ message: 'No record found to update',status:404 });
      }

  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).send({ error: "Update failed" });
  }
};
const Delete_user_info = async (req, res) => {
    const id = req.params.id;
  
    try {
      const isEmp = id.charAt(0) === 'E';
      const table = isEmp ? 'employees' : 'students';
      const column = isEmp ? 'emp_id' : 'stu_id';
  
      const update = await deleteaUser(table, column, id);
      if (update.affectedRows > 0) {
          console.log('------success-----')
          res.status(200).json({ message: 'Deleted successful',status:200 });
        } else {
          res.status(404).json({ message: 'No record found to Delete',status:404 });
        }
  
    } catch (err) {
      console.error("Update failed:", err);
      res.status(500).send({ error: "Deletion failed" });
    }
  };
  const Create_New_User = async (req, res,next) => {
    const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    
    const { user_id, email, role,first_name,last_name,password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
  
    try {
      const isEmp = user_id.charAt(0) === 'E';
      const table = isEmp ? 'employees' : 'students';
      const column = isEmp ? 'emp_id' : 'stu_id';

      const update = await CreateNewUser(table, column, user_id, first_name, last_name, email, role, hashedPassword, currentDate);
      if (update.affectedRows > 0) {
          console.log('------success-----')
          res.status(200).json({ message: 'created successful',status:200 });
          next();
        } else {
          res.status(404).json({ message: 'creating new candidate undefined or Email already exists',status:404 });
          return ;
        }
  
    } catch (err) {
      console.error("Update failed:", err);
      res.status(500).send({ error: "Creation failed" });
    }
  };




// const findUserId=async(req,res)=>{
//     const id=req.params.id;
//     if(id.charAt(0)==='E'){
//         const data=await findUserById('employees',)
//     }

module.exports={
    AllEmployees,
    AllStudents,
    Update_user_info,
    Delete_user_info,
    Create_New_User
    

};