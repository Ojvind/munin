import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../Shared/components/LanguageSwitcher';

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <header className="Navigation">
      <div className="Navigation-link">
        <Link to="/writers">{t('nav.writers')}</Link>
        |
        <Link to="/libri">{t('nav.books')}</Link>
      </div>
      <LanguageSwitcher />
    </header>
  );
};

export default Navigation;
