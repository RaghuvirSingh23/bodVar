import React, { useState } from 'react';
import { LuSend } from 'react-icons/lu';
import { FiSettings } from 'react-icons/fi';
import { supabase } from '../supabaseClient';
import './MainPage.css';

const MainPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('Send prompt:', prompt);
      setPrompt('');
    }
  };

  const handleSendClick = () => {
    console.log('Send prompt:', prompt);
    setPrompt('');
  };

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowSettings(false);
  };

  return (
    <div className="main-page">
      {/* Settings Button (top-right) */}
      <button className="settings-button" onClick={() => setShowSettings(true)}>
        <FiSettings size={18} />
      </button>

      {showSettings && (
        <div className="settings-modal">
          <div className="settings-content">
            <h2>Settings</h2>
            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            <button onClick={() => setShowSettings(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="chat-container">
        {/* Response Area */}
        <div className="response-area">
          <p>LLM response will appear here...</p>
        </div>

        {/* Prompt Area */}
        <div className="prompt-area">
          <textarea
            className="prompt-input"
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="send-button" onClick={handleSendClick}>
            <LuSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
