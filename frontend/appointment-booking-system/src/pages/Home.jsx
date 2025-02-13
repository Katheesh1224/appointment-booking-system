import React, { useEffect, useState } from 'react';
import '../App.css'; 
import Profile from '../components/profile/Profile.jsx';
import Body from '../components/body/Body.jsx';
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        setIsAuthenticated(true);
        } else {
        navigate('/');
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return null; 
    }
  
    return (
        <div className="container">
            <Profile/>
            <Body/>
        </div>
    );
};
      
export default Home;
