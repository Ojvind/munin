import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DefaultImage from '../../../assets/default-writer.svg';
import DeleteWriterMutation from '../../DeleteWriter';
import WriterUrl from './WriterUrl';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const WriterMobileCard = ({ writer }) => {
  const src = writer.portraitimageurl
    ? `${IMAGES_URL}/${writer.portraitimageurl}`
    : DefaultImage;

  return (
    <div className="mobile-card">
      <img
        src={src}
        alt={`${writer.name} ${writer.surname}`}
        className="mobile-card__portrait"
      />
      <div className="mobile-card__content">
        <Link
          to={`/writer/${writer.id}/${writer.name}/${writer.surname}`}
          className="mobile-card__name"
        >
          {writer.name}
          {' '}
          {writer.surname}
        </Link>
        {writer.nationality && (
          <img
            alt={writer.nationality}
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${writer.nationality}.svg`}
            width="24px"
            style={{ display: 'block', marginTop: '4px' }}
          />
        )}
      </div>
      <div className="mobile-card__actions">
        {writer.homepage && (
          <WriterUrl params={{ value: writer.homepage }} />
        )}
        <DeleteWriterMutation writerId={writer.id} />
      </div>
    </div>
  );
};

WriterMobileCard.propTypes = {
  writer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    surname: PropTypes.string,
    homepage: PropTypes.string,
    portraitimageurl: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
};

export default WriterMobileCard;
