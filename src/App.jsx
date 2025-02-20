import React from 'react';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      {/* Draggable region added at the top */}
      <div className="drag-bar"></div>
      <div className="background-section"></div>
      <div className="form-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default App;
