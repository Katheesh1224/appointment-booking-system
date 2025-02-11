import React from 'react';
import './profile.css'; 
import { useNavigate } from 'react-router-dom';



const Profile = () => {

    const Navigate = useNavigate();

    const handleLogout = () => {
        Navigate('/');
    }
  
    return (
        <div className="profile">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar"/>
            <h1>John Doe</h1>
            <p>johndoe@gmail.com</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
      
export default Profile;
