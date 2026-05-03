import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import BookListItemDetailView from './BookListItemDetailView';
import BookListItemDetailEdit from './BookListItemDetailEdit';
import { useImageUpload } from '../../Shared/hooks/useImageUpload';
import DefaultBookImage from '../../assets/default-book.svg';

function BookListItemDetail(props) {
  const { book } = props;

  const [edit, toggleEdit] = useState(false);
  const [title, onTitleChange] = useState(book.title);
  const [url, onUrlChange] = useState(book.url);
  const [yearPublished, onYearPublishedChange] = useState(book.yearPublished);
  const [yearRead, onYearReadChange] = useState(book.yearRead);
  const [description, onDescriptionChange] = useState(book.description);
  const [writerIds, onWriterIdsChange] = useState((book.writers || []).map((w) => w.id));

  const {
    avatarURL,
    portraitimageurl,
    fileUploadRef,
    handleImageUpload,
    uploadImageDisplay,
  } = useImageUpload(book.portraitimageurl, DefaultBookImage);

  return (
    <div>
      <div className="list-item-detail" style={{ position: 'relative' }}>
        {
          (!edit)
            ? (
              <>
                <IconButton
                  size="small"
                  onClick={() => toggleEdit(true)}
                  style={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <BookListItemDetailView
                  book={book}
                  avatarURL={avatarURL}
                  description={description}
                  yearPublished={yearPublished}
                  yearRead={yearRead}
                  url={url}
                  title={title}
                />
              </>
            )
            : (
              <BookListItemDetailEdit
                book={book}
                avatarURL={avatarURL}
                title={title}
                onTitleChange={onTitleChange}
                url={url}
                onUrlChange={onUrlChange}
                yearPublished={yearPublished}
                onYearPublishedChange={onYearPublishedChange}
                yearRead={yearRead}
                onYearReadChange={onYearReadChange}
                description={description}
                onDescriptionChange={onDescriptionChange}
                writerIds={writerIds}
                onWriterIdsChange={onWriterIdsChange}
                portraitimageurl={portraitimageurl}
                fileUploadRef={fileUploadRef}
                handleImageUpload={handleImageUpload}
                uploadImageDisplay={uploadImageDisplay}
                toggleEdit={toggleEdit}
                edit={edit}
              />
            )
        }
      </div>
    </div>
  );
}

BookListItemDetail.propTypes = {
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
};

export default BookListItemDetail;
