import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './LoginForm.css';

function LoginForm({ onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (mode === 'signup' && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        if (onAuthSuccess) onAuthSuccess();
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        if (onAuthSuccess) onAuthSuccess();
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-form-container">
      <h2>{mode === 'login' ? 'LOGIN' : 'SIGN UP'}</h2>
      <form onSubmit={handleSubmit}>
        <div className={`form-fields ${mode === 'signup' ? 'expanded' : ''}`}>
          <div className="form-field">
            <label>
              <FiMail className="input-icon" /> Email
            </label>
            <input
              type="email"
              placeholder="raghusi@bodvar.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>
              <FiLock className="input-icon" /> Password
            </label>
            <div className="input-with-icon">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="itsaSecret"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {mode === 'signup' && (
            <div className="form-field">
              <label>
                <FiLock className="input-icon" /> Confirm Password
              </label>
              <div className="input-with-icon">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="error">{error || "\u00A0"}</p>
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
