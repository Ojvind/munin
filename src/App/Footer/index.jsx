import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from '../../Shared/components/Link';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="Footer">
      <div>
        <small>
          <span className="Footer-text">
            &copy;
            {' '}
            {t('footer.builtBy')}
          </span>
          {' '}
          <Link
            className="Footer-link"
            href="https://ojvind.otterbjork.se"
          >
            Öjvind Otterbjörk
          </Link>
          {' '}
          <span className="Footer-text">{t('footer.with')}</span>
        </small>
      </div>
    </div>
  );
};

export default Footer;
