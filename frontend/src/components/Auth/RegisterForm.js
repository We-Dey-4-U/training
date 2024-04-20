import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css'; // Import the CSS file
import api from '../../api'; // Import the Axios instance

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { username, password });
      console.log(response.data);
      setMessage('Registration successful. Please log in.');
      // Redirect user to TaskForm upon successful registration
      navigate('/home');
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Error registering user.');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
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
          <button type="submit">Register</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>Already have an account? <Link to="/login" className="link">Login here</Link></p>
      </div>
    </div>
  );
};

export default RegisterForm;