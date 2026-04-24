import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SIGN_IN from '../mutations';
import { useAuth } from '../AuthContext';
import { WRITERS } from '../../constants/routes';

const SignIn = () => {
  const { t } = useTranslation();
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
      setError(t('auth.error'));
    },
  });

  const handleSubmit = () => {
    setError('');
    signIn({ variables: { login, password } });
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto' }}>
      <h2>{t('auth.title')}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="login">
            {t('auth.username')}
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
            {t('auth.password')}
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
          {loading ? t('auth.loading') : t('auth.submit')}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
