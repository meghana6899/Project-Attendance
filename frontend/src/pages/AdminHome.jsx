import React from 'react'
import EmployeesTable from '../components/EmployeesTable';
import StudentsTable from '../components/StudentsTable';
import { useState } from 'react';
import Card from '../components/Card';

const AdminHome = () => {
  const [emp,setEmp]=useState(false);
  const [stu,setStu]=useState(false);
  const [admin,setAdmin]=useState(true);
  console.log(admin);


  return (<>
  <input type="button"  value='Employees' onClick={()=>{setStu(false);setAdmin(false);setEmp(true);}} />
  
   <input type="button" value='Students' onClick={()=>{setAdmin(false);setEmp(false);setStu(true);
   }}/>  
   <input type ='button' value='admin' onClick={()=>{setEmp(false);setStu(false);setAdmin(true)}}   /> 
{/* 
  {admin && }                                             */}
  {emp && <EmployeesTable />}
  
  {stu && <StudentsTable />}

  <Card />
  </>
    
   
  )
}

export default AdminHome