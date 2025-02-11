import React, { useEffect, useState } from 'react';
import './login.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faKey, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';


const usernames = ["david", "david1", "david2"];

const Login = () => {

  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 
  const Navigate = useNavigate();



  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const usernameExists = usernames.includes(inputValue);
        setIsValid(usernameExists);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsValid(false);
    }
  }, [inputValue]);

  const handleSignIn = () => {
    Navigate('/home');
  };
  
  return (
    <div className="login-container">
      <div className="login">

      {isSignUp && (
        <>
          <div className="textbox">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>  
        </>
      )}
      
        <div className="textbox">
          <input
            id="input"
            type="text"
            autoComplete="off"
            className={` ${inputValue ? "has-value" : ""} ${isValid ? "valid" : ""}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={() => setIsTyping(true)}
          />
          <span className="icon visible material-symbols-outlined"><FontAwesomeIcon icon={faCircleUser} size="sm" /></span>
          <label htmlFor="input">Username</label>
          <span className={`spinner ${isLoading ? "visible" : ""}`}></span>
        </div>

        <div className="textbox">
          <input
            id="password"
            type="text"
          />
          <span className="icon visible material-symbols-outlined"><FontAwesomeIcon icon={faKey} size="xs" /></span>
          <label htmlFor="password">Password</label>
        </div>

        {isSignUp && (
        <>
          <div className="textbox">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>
        </>
      )}

        <button className='signin-button' disabled={!isValid} onClick={handleSignIn}>
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <span className="material-symbols-outlined"><FontAwesomeIcon icon={faCircleArrowRight} size="lg"/></span>
        </button>

        <span className="signup" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Register"}
        </span>
      </div>
    </div>
  );
};
  
export default Login;
