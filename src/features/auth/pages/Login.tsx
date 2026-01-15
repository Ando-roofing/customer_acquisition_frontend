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
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="mb-4 text-center">Login</h3>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {status === 'error' && (
          <div className="alert alert-danger">{error}</div>
        )}

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}
