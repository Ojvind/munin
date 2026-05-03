import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Label from '../../Shared/components/Label';
import DefaultImage from '../../assets/upload-photo-here.png';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

function BookListItemDetailView({
  book,
  avatarURL,
  description,
  yearPublished,
  yearRead,
  url,
  title,
}) {
  const { t } = useTranslation();
  return (
    <div className="full-width">
      <div className="list-item-detail__row">
        <div className="list-item-detail__row__column">
          <img
            src={avatarURL || (book.portraitimageurl ? `${IMAGES_URL}/${book.portraitimageurl}` : DefaultImage)}
            alt="Avatar"
            width="200px"
          />
        </div>
        <div className="list-item-detail__row__column">
          <Label variant="subtitle2">
            {`${t('book.fields.title')}:`}
          </Label>
          <Label
            variant="h5"
            isLink
            url={url}
          >
            {title}
          </Label>
          <br />
          <div>
            <Label variant="subtitle2">
              {`${t('book.fields.author')}:`}
            </Label>
            {(book.writers || []).map((writer, i) => (
              <span key={writer.id}>
                {i > 0 && ', '}
                <RouterLink to={`/writer/${writer.id}/${writer.name}/${writer.surname}`}>
                  {`${writer.name} ${writer.surname}`}
                </RouterLink>
              </span>
            ))}
          </div>
          <br />
          <div>
            <Label variant="subtitle2">
              {`${t('book.fields.description')}:`}
            </Label>
          </div>
          <div className="break" />
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
          <br />
          <Label variant="h6">
            {t('book.detail.publishedAndRead', { yearPublished, yearRead })}
          </Label>
        </div>
      </div>
    </div>
  );
}

BookListItemDetailView.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    yearRead: PropTypes.string,
    yearPublished: PropTypes.string,
    description: PropTypes.string,
    portraitimageurl: PropTypes.string,
    writers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
    })),
  }).isRequired,
  avatarURL: PropTypes.string,
  description: PropTypes.string,
  yearPublished: PropTypes.string,
  yearRead: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
};

BookListItemDetailView.defaultProps = {
  avatarURL: '',
  description: '',
  yearPublished: '',
  yearRead: '',
  url: '',
  title: '',
};

export default BookListItemDetailView;
