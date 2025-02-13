import React, { useEffect, useState } from 'react';
import './profile.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
              setError('You need to be logged in');
              return;
            }
            
            try {
              const response = await axios.get('http://localhost:5000/appointments/userdata', {
                headers: {
                  Authorization: `Bearer ${token}`, // Ensure it's prefixed with 'Bearer'
                },
              });
              
              setUserData(response.data);
            } catch (err) {
              setError(err.response?.data?.error || 'Error fetching user data');
            }
          };          
    
        fetchUserData();
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/'); 
      };
  
    return (
        <div className="profile">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar"/>
            {error && <p>{error}</p>}

            {userData ? (
                <div className='user-info'>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
      
export default Profile;
