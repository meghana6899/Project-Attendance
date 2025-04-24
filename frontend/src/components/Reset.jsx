import React from 'react'
import { useState } from 'react'
import axios from 'axios'



const Reset = () => {
    const [email, setEmail] = useState('')
   const handleChange = (e) => {
    console.log(e.target.value)
       setEmail(e.target.value)
   }

   const handleSubmit = async (e) => {
    const user=localStorage.getItem('user')
    console.log(user)
    const user1=JSON.parse(user);
       e.preventDefault()
       try{
        const response=await axios.post (` http://localhost:3000/api/forgetpassword`,{
            email:email,
            user_id:user1.id,
        })
        console.log(response.data)
       }
       catch(err){
        console.log(err)
       }
       setEmail('')
       
   }
  return (
    <form onSubmit={handleSubmit} className="p-4 rounded ">
        <input type="email" 
placeholder="Enter your email" className="form-control mb-3" 
onChange={handleChange} value={email}/>

<input type="submit" className="btn btn-primary w-100" value="Submit" />

         
    </form>
  )
}

export default Reset