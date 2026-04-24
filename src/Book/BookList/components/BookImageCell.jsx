import React from 'react';
import PropTypes from 'prop-types';
import DefaultImage from '../../../assets/default-book.svg';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const BookImageCell = ({ params }) => (
  <div>
    <img
      src={params.value ? `${IMAGES_URL}/${params.value}` : DefaultImage}
      alt="Book cover"
      width="75px"
    />
  </div>
);

BookImageCell.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default BookImageCell;
