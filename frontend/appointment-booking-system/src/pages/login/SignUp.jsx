import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faKey, faCircleArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    
    
    const navigate = useNavigate();

    useEffect(() => {
        const checkUsername = async () => {
            if (email) {
                setIsLoading(true);
                const timer = setTimeout(async () => {
                    try {
                        const response = await axios.get('http://localhost:5000/auth/check-email', {
                        params: { email: email }
                        });
            
                        if (response.status === 200) {
                        setIsValid(true); 
                        setIsLoading(false);
                        }
                    } catch (err) {
                        if (err.response?.status === 400) {
                        setIsValid(false); 
                        }
                    } finally {
                        setIsLoading(false);
                    }
                }, 500);
        
                return () => clearTimeout(timer);
            } else {
                setIsValid(false);
            }
        };
    
        checkUsername();
    }, [email]);

    const handleSignUp = async () => {
        setIsLoading(true);
        setErrorMessage("");

        if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setIsLoading(false);
        return;
        }

        try {
        await axios.post("http://localhost:5000/auth/signup", { email, username, password });
        navigate('/');  
        } catch (error) {
        setErrorMessage(error.response?.data?.error || "Registration failed");
        }

        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login">
                <div className="textbox">
                    <input 
                    type="text" 
                    className={` ${username ? "has-value" : ""} ${isValid ? "valid" : ""}`} 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                    />
                    <span className="icon"><FontAwesomeIcon icon={faCircleUser} size="sm" /></span>
                    <label>Username</label>
                    <span className={`spinner ${isLoading ? "visible" : ""}`}></span>
                </div>

                <div className="textbox">
                    <input 
                    type="email" 
                    className={` ${email ? "has-value" : ""} ${isValid ? "valid" : ""}`} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    onKeyDown={() => setIsTyping(true)} 
                    required
                    />
                    <span className="icon"><FontAwesomeIcon icon={faEnvelope} size="sm" /></span>
                    <label>Email</label>
                </div>

                <div className="textbox">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <span className="icon"><FontAwesomeIcon icon={faKey} size="xs" /></span>
                    <label>Password</label>
                </div>

                <div className="textbox">
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    <span className="icon"><FontAwesomeIcon icon={faKey} size="xs" /></span>
                    <label>Confirm Password</label>
                </div>

                <button className="signin-button" disabled={!isValid} onClick={handleSignUp}>
                <p>Sign Up</p>
                <span><FontAwesomeIcon icon={faCircleArrowRight} size="lg"/></span>
                </button>

                <span className="signup" onClick={() => navigate('/')}>
                Already have an account? Sign In
                </span>
            </div>
        </div>
    );
};

export default SignUp;
