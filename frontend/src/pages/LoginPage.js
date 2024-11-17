import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // CSS riêng cho trang LoginPage

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn form reload trang
    try {
      // Gửi request login
      const response = await axios.post('http://localhost:4000/api/users/login', {
        email,
        password,
      });

      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.token);

      // Chuyển hướng người dùng đến trang chính (HomePage)
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <a href="/register" className="register-link">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
