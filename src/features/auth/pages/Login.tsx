import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loginThunk } from '../store/auth.thunks';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ username, password }));
  };

  // Redirect on successful login
  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/dashboard');
    }
  }, [status, navigate]);

  return (
    <div className="card card-md">
      <div className="card-body">
        <h2 className="h2 text-center mb-4">Login to your account</h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="your@email.com"
              autoComplete="off"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">
              Password
              <span className="form-label-description">
                <a href="forgot-password.html">I forgot password</a>
              </span>
            </label>
            <div className="input-group input-group-flat">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-group-text">
                <a href="sign-in.html#" className="link-secondary" title="Show password" data-bs-toggle="tooltip">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-1">
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                  </svg>
                </a>
              </span>
            </div>
          </div>
          <div className="mb-2">
            <label className="form-check">
              <input type="checkbox" className="form-check-input" />
              <span className="form-check-label">Remember me on this device</span>
            </label>
          </div>


          {status === 'error' && (
            <div className="alert alert-danger">{error}</div>
          )}
          <div className="form-footer">
            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Signing in ... ' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
