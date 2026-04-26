import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import DefaultImage from '../../../assets/default-writer.svg';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const WriterPortrait = ({ params }) => {
  const src = params.value ? `${IMAGES_URL}/${params.value}` : DefaultImage;

  return (
    <Tooltip
      title={(
        <img
          src={src}
          alt="Writer portrait"
          style={{
            width: '300px',
            height: '300px',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      )}
      placement="right"
      arrow
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
      >
        <img
          src={src}
          alt="Writer portrait"
          style={{
            width: '60px',
            height: '60px',
            minWidth: '60px',
            minHeight: '60px',
            objectFit: 'cover',
            objectPosition: 'center top',
            borderRadius: '4px',
            display: 'block',
          }}
        />
      </div>
    </Tooltip>
  );
};

WriterPortrait.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default WriterPortrait;
