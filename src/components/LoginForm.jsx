import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './LoginForm.css';

function LoginForm() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-form-container">
      <h2>{mode === 'login' ? 'LOGIN' : 'SIGN UP'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="raghusi@bodvar.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="itsaSecret"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {<p className="error">{error || "\u00A0"}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <div className="toggle-mode">
        {mode === 'login' ? (
          <p>
            Don't have an account?{' '}
            <span className="toggle-link" onClick={toggleMode}>
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span className="toggle-link" onClick={toggleMode}>
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
