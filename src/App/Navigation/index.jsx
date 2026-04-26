import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import WavesOutlinedIcon from '@mui/icons-material/WavesOutlined';
import LanguageSwitcher from '../../Shared/components/LanguageSwitcher';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useAuth } from '../../Session/AuthContext';

const THEME_BUTTONS = [
  { name: 'earth', color: '#c9a478', Icon: LandscapeOutlinedIcon },
  { name: 'ocean', color: '#2e6e8e', Icon: WavesOutlinedIcon },
  { name: 'dark', color: '#9589d6', Icon: DarkModeOutlinedIcon },
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
        {THEME_BUTTONS.map(({ name, color, Icon }) => (
          <Tooltip key={name} title={t(`theme.${name}`)} enterDelay={0} enterNextDelay={0}>
            <button
              type="button"
              aria-label={t(`theme.${name}`)}
              onClick={() => selectTheme(name)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                color: themeName === name ? color : 'rgba(255,255,255,0.5)',
              }}
            >
              <Icon style={{ fontSize: '20px' }} />
            </button>
          </Tooltip>
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
