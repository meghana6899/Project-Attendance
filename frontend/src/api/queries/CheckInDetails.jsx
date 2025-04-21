import React from 'react';
import axios from 'axios';
// import { useAdmin } from "../../context/AuthContext";

async function CheckInDetails() {

    // const user = JSON.parse(localStorage.getItem('user'))

    // const response = await axios.get(`http://localhost:3000/api/details/${user.role}/${user.id}`)

    // const {user}=useAdmin();
    // const id = localStorage.getItem('id');
    // const role = localStorage.getItem('role');
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user);

    var users;
    if(user.role=='admin' || user.role=='employee'){
        users='employee'

    }else{
        users='student'
    }
    const response = await axios.get(`http://localhost:3000/api/details/${users}/${user.id}`)

    console.log("Entered axios", response.data)
    return response.data
}

export default CheckInDetails

