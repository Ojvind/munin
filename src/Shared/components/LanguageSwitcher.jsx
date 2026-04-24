import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'it', label: '🇮🇹' },
  { code: 'sv', label: '🇸🇪' },
  { code: 'en', label: '🇬🇧' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleChange(code)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
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
