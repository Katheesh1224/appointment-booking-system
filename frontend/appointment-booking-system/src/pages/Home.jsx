import React, { useEffect, useState } from 'react';
import '../App.css'; 
import Body from '../components/body/Body.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header.jsx';

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
            <Header/>
            <Body/>
        </div>
    );
};
      
export default Home;
