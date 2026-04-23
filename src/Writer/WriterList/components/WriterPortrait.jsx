import React from 'react';
import PropTypes from 'prop-types';
import DefaultImage from '../../../assets/upload-photo-here.png';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const WriterPortrait = ({ params }) => (
  <div>
    <img
      src={params.value ? `${IMAGES_URL}/${params.value}` : DefaultImage}
      alt="Writer portrait"
      width="75px"
    />
  </div>
);

WriterPortrait.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default WriterPortrait;
