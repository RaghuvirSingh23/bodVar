import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { supabase } from './supabaseClient';
import './App.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAuthenticated(true);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = () => {
    setSlide(true);
    setTimeout(() => {
      setAuthenticated(true);
    }, 800);
  };

  return (
    <div className="app-container">
      <div className="drag-bar" />
      {authenticated ? (
        <MainPage />
      ) : (
        <LoginPage onAuthSuccess={handleAuthSuccess} slide={slide} />
      )}
    </div>
  );
};

export default App;
