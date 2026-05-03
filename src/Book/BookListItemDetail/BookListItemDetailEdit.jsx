import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useMutation, useQuery } from '@apollo/client';
import Input from '../../Shared/components/Input';
import SaveButton from '../../Shared/components/SaveButton';
import RichTextEditor from '../../Shared/components/RichTextEditor';
import ErrorMessage from '../../Error';
import DefaultImage from '../../assets/default-book.svg';
import { UPDATE_BOOK } from '../mutations';
import { GET_BOOK } from '../queries';
import { GET_WRITERS } from '../../Writer/queries';

function BookListItemDetailEdit({
  book,
  avatarURL,
  title,
  onTitleChange,
  url,
  onUrlChange,
  yearPublished,
  onYearPublishedChange,
  yearRead,
  onYearReadChange,
  description,
  onDescriptionChange,
  writerIds,
  onWriterIdsChange,
  portraitimageurl,
  fileUploadRef,
  handleImageUpload,
  uploadImageDisplay,
  toggleEdit,
  edit,
}) {
  const { data: writersData } = useQuery(GET_WRITERS);
  const allWriters = writersData?.writers?.edges || [];

  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [
      {
        query: GET_BOOK,
        variables: { bookId: book.id },
      },
    ],
  });

  const handleSave = async () => {
    try {
      await updateBook({
        variables: {
          id: book.id,
          writerIds,
          title,
          url,
          yearPublished,
          yearRead,
          description,
          portraitimageurl,
        },
      });
      toggleEdit(!edit);
    } catch (e) {
      // Error will be shown by error prop
    }
  };

  const selectedWriters = allWriters.filter((w) => writerIds.includes(w.id));

  return (
    <div className="list-item-detail__wrapper">
      <img
        src={avatarURL || book.portraitimageurl || DefaultImage}
        alt="Avatar"
        width="20%"
      />
      <form id="form" encType="multipart/form-data">
        <Button onClick={handleImageUpload}>
          Imposta immagine
        </Button>
        <input
          type="file"
          id="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden
        />
      </form>
      <br />
      <Input onChange={(e) => onTitleChange(e.target.value)} inputLabel="Titolo" value={title} />
      <Input onChange={(e) => onUrlChange(e.target.value)} inputLabel="URL" value={url} />
      <RichTextEditor label="Descrizione" value={description} onChange={onDescriptionChange} />
      <Input onChange={(e) => onYearPublishedChange(e.target.value)} inputLabel="Anno di pubblicazione" value={yearPublished} />
      <Input onChange={(e) => onYearReadChange(e.target.value)} inputLabel="Ho letto il libro nel" value={yearRead} />
      <Autocomplete
        multiple
        options={allWriters}
        getOptionLabel={(w) => [w.name, w.surname].filter(Boolean).join(' ')}
        value={selectedWriters}
        onChange={(_e, selected) => onWriterIdsChange(selected.map((w) => w.id))}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ m: 1, width: 'calc(100% - 16px)' }}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label="Författare" variant="outlined" />
        )}
      />
      <div className="list-item-detail__row list-item-detail__row__button">
        <SaveButton onClick={handleSave} disabled={loading}>
          Salva
        </SaveButton>
      </div>
      {error && (
        <div>
          <ErrorMessage error={error} />
        </div>
      )}
    </div>
  );
}

BookListItemDetailEdit.propTypes = {
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
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  yearPublished: PropTypes.string.isRequired,
  onYearPublishedChange: PropTypes.func.isRequired,
  yearRead: PropTypes.string.isRequired,
  onYearReadChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  writerIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onWriterIdsChange: PropTypes.func.isRequired,
  portraitimageurl: PropTypes.string,
  fileUploadRef: PropTypes.shape({
    current: PropTypes.oneOfType([
      PropTypes.instanceOf(HTMLInputElement),
      PropTypes.oneOf([null]),
    ]),
  }).isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  uploadImageDisplay: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

BookListItemDetailEdit.defaultProps = {
  avatarURL: '',
  portraitimageurl: '',
};

export default BookListItemDetailEdit;
