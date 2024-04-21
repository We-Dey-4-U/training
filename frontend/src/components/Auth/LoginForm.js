import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import api from '../../api';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { username, password });
            console.log(response.data);
            setMessage('Login successful.');
            if (response.data.redirectTo) {
                navigate(response.data.redirectTo);
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Invalid username or password.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p>Don't have an account? <Link to="/register" className="link">Register here</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;