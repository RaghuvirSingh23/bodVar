import React from 'react';
import LoginForm from './components/LoginForm';
import AnimatedHeading from './components/AnimatedHeading'; // new component
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="drag-bar" />
      <div className="background-section">
        <AnimatedHeading />
      </div>
      <div className="form-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default App;
