import React from 'react';
import './App.css'; 
import Profile from './components/profile/Profile.jsx';
import Body from './components/body/Body.jsx';



const Home = () => {
  
    return (
        <div className="container">
            <Profile/>
            <Body/>
        </div>
    );
};
      
export default Home;
