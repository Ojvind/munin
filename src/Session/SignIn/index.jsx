import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import SIGN_IN from '../mutations';
import { useAuth } from '../AuthContext';
import { WRITERS } from '../../constants/routes';

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      setToken(data?.signIn?.token);
      navigate(WRITERS);
    },
    onError: () => {
      setError('Fel användarnamn eller lösenord.');
    },
  });

  const handleSubmit = () => {
    setError('');
    signIn({ variables: { login, password } });
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto' }}>
      <h2>Logga in</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="login">
            Användarnamn
            <br />
            <input
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              autoComplete="username"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">
            Lösenord
            <br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="button" onClick={handleSubmit} disabled={loading} style={{ padding: '8px 24px' }}>
          {loading ? 'Loggar in...' : 'Logga in'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
