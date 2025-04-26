import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed: was 'react-router'
import { useAdmin } from '../context/AuthContext';
import axios from 'axios';
import icon from '../assets/icons8-loading.gif';

const Resetpopup = () => {
  const { setFlag } = useAdmin();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = async () => {
    setLoading(true);

    const user = localStorage.getItem('user');
    const email = JSON.parse(localStorage.getItem('email'));
    const user1 = JSON.parse(user);

    try {
      const response = await axios.post(`http://localhost:3000/api/forgetpassword`, {
        email: email,
        user_id: user1.id,
      });


      setLoading(false);
      navigate('/confirmmail');
    } catch (err) {
      console.log(err);
      setLoading(false); // Always stop loading even on error
    }
  };

  const handleSkip = () => {
    setFlag(false);
  };

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
              {loading && <img src={icon} alt="Loading..." style={{ width: '50px', marginTop: '10px' }} />}
            </div>

            <div className="modal-footer justify-content-center">
              <button className="btn btn-secondary" onClick={handleSkip} disabled={loading}>Skip</button>
              <button className="btn btn-primary" onClick={handleReset} disabled={loading}>Reset Now</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Resetpopup;
