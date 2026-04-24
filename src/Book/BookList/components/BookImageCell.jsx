import React from 'react';
import PropTypes from 'prop-types';
import DefaultImage from '../../../assets/default-book.svg';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const BookImageCell = ({ params }) => (
  <img
    src={params.value ? `${IMAGES_URL}/${params.value}` : DefaultImage}
    alt="Book cover"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    }}
  />
);

BookImageCell.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default BookImageCell;
