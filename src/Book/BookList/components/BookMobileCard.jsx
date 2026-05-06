import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DefaultImage from '../../../assets/default-book.svg';
import DeleteBookMutation from '../../DeleteBook';
import BookUrlCell from './BookUrlCell';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const BookMobileCard = ({ book }) => {
  const { t } = useTranslation();
  const src = book.portraitimageurl
    ? `${IMAGES_URL}/${book.portraitimageurl}`
    : DefaultImage;

  return (
    <div className="mobile-card">
      <img
        src={src}
        alt={book.title}
        className="mobile-card__cover"
      />
      <div className="mobile-card__content">
        <Link
          to={`/book/${book.id}/${book.title}`}
          className="mobile-card__name"
        >
          {book.title}
        </Link>
        <span className="mobile-card__meta">
          {book.wantToRead && (
            <Chip
              icon={<BookmarkIcon />}
              label={t('book.fields.wantToRead')}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 0.5, verticalAlign: 'middle' }}
            />
          )}
          {book.yearPublished}
          {book.yearRead ? ` · ${book.yearRead}` : ''}
        </span>
      </div>
      <div className="mobile-card__actions">
        {book.url && (
          <BookUrlCell params={{ value: book.url }} />
        )}
        <DeleteBookMutation bookId={book.id} writerId={book.writers?.[0]?.id} />
      </div>
    </div>
  );
};

BookMobileCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
    yearPublished: PropTypes.string,
    yearRead: PropTypes.string,
    portraitimageurl: PropTypes.string,
    wantToRead: PropTypes.bool,
    writers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
    })),
  }).isRequired,
};

export default BookMobileCard;
