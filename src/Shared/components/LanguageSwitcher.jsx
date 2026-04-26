import React from 'react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

const LANGUAGES = [
  { code: 'it', label: '🇮🇹', name: 'Italiano' },
  { code: 'sv', label: '🇸🇪', name: 'Svenska' },
  { code: 'en', label: '🇬🇧', name: 'English' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  if (isMobile) {
    return (
      <select
        value={i18n.language}
        onChange={(e) => handleChange(e.target.value)}
        className="language-switcher-select"
      >
        {LANGUAGES.map(({ code, label, name }) => (
          <option key={code} value={code}>
            {`${label} ${name}`}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '8px', paddingRight: '40px' }}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleChange(code)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '2rem',
            opacity: i18n.language === code ? 1 : 0.4,
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
