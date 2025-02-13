import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faCircleArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const handleSignIn = async () => {
        setIsLoading(true);
        setErrorMessage("");


        try {
        const response = await axios.post("http://localhost:5000/auth/signin", { email, password });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.userId);
        navigate('/home');
        } catch (error) {
        setErrorMessage(error.response?.data?.error || "Invalid email or password");
        }

        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login">
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="textbox">
                    <input 
                    type="email" 
                    className={` ${email ? "has-value" : ""} ${!isValid ? "valid" : ""}`} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    onKeyDown={() => setIsTyping(true)} 
                    required
                    />
                    <span className="icon"><FontAwesomeIcon icon={faEnvelope} size="sm" /></span>
                    <label>Email</label>
                </div>

                <div className="textbox">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="icon"><FontAwesomeIcon icon={faKey} size="xs" /></span>
                    <label>Password</label>
                </div>

                <button className="signin-button" onClick={handleSignIn} disabled={isValid}>
                <p>Sign In</p>
                <span><FontAwesomeIcon icon={faCircleArrowRight} size="lg"/></span>
                </button>

                <span className="signup" onClick={() => navigate('/signup')}>
                Don't have an account? Register
                </span>
            </div>
        </div>
    );
};

export default SignIn;
