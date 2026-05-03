import React from 'react';
import PropTypes from 'prop-types';
import DeleteBookMutation from '../../DeleteBook';

const BookDeleteCell = ({ params }) => (
  <DeleteBookMutation
    bookId={`${params.row.id}`}
    writerId={params.row.writers?.[0]?.id}
  />
);

BookDeleteCell.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.shape({
      id: PropTypes.string.isRequired,
      writers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })),
    }).isRequired,
  }).isRequired,
};

export default BookDeleteCell;
