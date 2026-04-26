import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import LanguageSwitcher from '../../Shared/components/LanguageSwitcher';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useAuth } from '../../Session/AuthContext';

const THEME_BUTTONS = [
  { name: 'earth', color: '#c9a478' },
  { name: 'ocean', color: '#2e6e8e' },
  { name: 'dark', color: '#9589d6', background: 'linear-gradient(135deg, #9589d6 30%, #12131f 100%)' },
];

const Navigation = () => {
  const { t } = useTranslation();
  const { themeName, selectTheme } = useThemeContext();
  const { token, removeToken } = useAuth();
  const client = useApolloClient();

  const handleSignOut = () => {
    removeToken();
    client.clearStore();
  };

  return (
    <header className="Navigation">
      <div className="Navigation-link">
        <Link to="/writers">{t('nav.writers')}</Link>
        |
        <Link to="/libri">{t('nav.books')}</Link>
      </div>
      <LanguageSwitcher />
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        paddingRight: '40px',
      }}
      >
        {THEME_BUTTONS.map(({ name, color, background }) => (
          <button
            key={name}
            type="button"
            aria-label={t(`theme.${name}`)}
            title={t(`theme.${name}`)}
            onClick={() => selectTheme(name)}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: background || color,
              border: themeName === name ? '2px solid #ffffff' : '2px solid transparent',
              outline: themeName === name ? `2px solid ${color}` : 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
        {token && (
          <button
            type="button"
            onClick={handleSignOut}
            className="Navigation-signout"
          >
            {t('nav.signOut')}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navigation;
