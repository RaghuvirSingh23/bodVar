import React from 'react';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="background-section"></div>
      <div className="form-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default App;
