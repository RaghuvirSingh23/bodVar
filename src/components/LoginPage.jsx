import React from 'react';
import LoginForm from './LoginForm';
import AnimatedHeading from './AnimatedHeading';
import './LoginPage.css';

const LoginPage = ({ onAuthSuccess, slide }) => {
  return (
    <div className={`login-page ${slide ? 'slide-out' : ''}`}>
      <div className="drag-bar" />
      <div className="background-section">
        <AnimatedHeading />
      </div>
      <div className="form-section">
        <LoginForm onAuthSuccess={onAuthSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;
