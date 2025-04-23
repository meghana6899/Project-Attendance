import React from 'react'
import { useNavigate } from 'react-router'
import { useAdmin } from '../context/AuthContext';
import axios from 'axios';


const Resetpopup = () => {
    const { flag, setFlag } = useAdmin();
    console.log(flag, 'flag is here to check');

    const navigate = useNavigate();

    const handleReset = async () => {
            const user=localStorage.getItem('user');
            const email=JSON.parse(localStorage.getItem('email'));  
            console.log(user)
            const user1=JSON.parse(user);
             
               try{
                const response=await axios.post (` http://localhost:3000/api/forgetpassword`,{
                    email:email,
                    user_id:user1.id,
                })
                console.log(response.data);
                navigate('/confirmmail');

             
               
               
              
               
           }
           catch(err){
            console.log(err)
           }
        }
        
    
    const handleSkip = async () => {
        setFlag(false);
        
       
    }
  return (
    <>
   <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Reset your password</h5>
          </div>

          <div className="modal-body text-center">
            <p>Do you want to reset your password now or skip it?</p>
          </div>

          <div className="modal-footer justify-content-center">
            <button className="btn btn-secondary" onClick={handleSkip}>Skip</button>
            <button className="btn btn-primary" onClick={handleReset}>Reset Now</button>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
export default Resetpopup