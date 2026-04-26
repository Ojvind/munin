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
          style={{ width: '300px', height: '300px', objectFit: 'cover' }}
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
        padding: '2px',
        boxSizing: 'border-box',
      }}
      >
        <img
          src={src}
          alt="Writer portrait"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '4px',
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
