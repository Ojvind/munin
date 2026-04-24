import React from 'react';

import Link from '../../Shared/components/Link';

const Footer = () => (
  <div className="Footer">
    <div>
      <small>
        <span className="Footer-text">&copy; Costruito da</span>
        {' '}
        <Link
          className="Footer-link"
          href="https://ojvind.otterbjork.se"
        >
          Öjvind Otterbjörk
        </Link>
        {' '}
        <span className="Footer-text">con Sangue, sudore e lacrime</span>
      </small>
    </div>
  </div>
);

export default Footer;
