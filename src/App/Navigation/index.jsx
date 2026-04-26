import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../Shared/components/LanguageSwitcher';
import { useThemeContext } from '../../contexts/ThemeContext';

const THEME_BUTTONS = [
  { name: 'earth', color: '#c9a478' },
  { name: 'ocean', color: '#2e6e8e' },
];

const Navigation = () => {
  const { t } = useTranslation();
  const { themeName, selectTheme } = useThemeContext();

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
        {THEME_BUTTONS.map(({ name, color }) => (
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
              backgroundColor: color,
              border: themeName === name ? '2px solid #ffffff' : '2px solid transparent',
              outline: themeName === name ? `2px solid ${color}` : 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default Navigation;
