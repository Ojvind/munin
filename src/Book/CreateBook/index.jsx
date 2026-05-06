import React, { useState } from 'react';
import {
  useMutation, useQuery,
} from '@apollo/client';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip'; // eslint-disable-line no-unused-vars
import { useTranslation } from 'react-i18next';

import { CREATE_BOOK } from '../mutations';
import { GET_BOOKS, GET_ALL_BOOKS } from '../queries';
import { GET_WRITERS } from '../../Writer/queries';

import Input from '../../Shared/components/Input';
import Label from '../../Shared/components/Label';
import SaveButton from '../../Shared/components/SaveButton';
import ErrorMessage from '../../Error';

const CreateBook = ({ writerId = null, initialWantToRead = false, onSuccess = null }) => {
  const { t } = useTranslation();

  const [title, onTitleChange] = useState('');
  const [url, onUrlChange] = useState('');
  const [yearPublished, onYearPublishedChange] = useState('');
  const [yearRead, onReadChange] = useState('');
  const [description, onDecriptionChange] = useState('');
  const [wantToRead, setWantToRead] = useState(initialWantToRead);
  const [writerIds, setWriterIds] = useState(writerId ? [writerId] : []);
  const [selectedWriters, setSelectedWriters] = useState([]);

  const { data: writersData } = useQuery(GET_WRITERS, { skip: !!writerId });
  const allWriters = writersData?.writers?.edges || [];

  const refetchQueries = [
    { query: GET_ALL_BOOKS },
    ...(writerId ? [{ query: GET_BOOKS, variables: { writerId } }] : []),
  ];

  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    variables: {
      writerIds,
      title,
      url,
      yearPublished,
      yearRead: wantToRead ? undefined : yearRead,
      wantToRead,
      description,
    },
    refetchQueries,
  });

  const handleSave = async () => {
    try {
      await createBook();
      if (onSuccess) onSuccess();
    } catch (e) {
      // Error will be shown by error prop
    }
  };

  return (
    <div>
      <Label variant="h4">
        {t('book.createNew')}
      </Label>
      <div className="create-book">
        <div className="create-book__input">
          <Input onChange={(e) => onTitleChange(e.target.value)} id="title" inputLabel={t('book.fields.title')} />
        </div>
        <div className="create-book__input">
          <Input onChange={(e) => onUrlChange(e.target.value)} id="url" inputLabel={t('book.fields.url')} />
        </div>
        <div className="create-book__input">
          <Input onChange={(e) => onYearPublishedChange(e.target.value)} id="year_published" inputLabel={t('book.fields.yearPublished')} />
        </div>
        {!writerId && (
          <div className="create-book__input">
            <Autocomplete
              multiple
              options={allWriters}
              getOptionLabel={(w) => [w.name, w.surname].filter(Boolean).join(' ')}
              value={selectedWriters}
              onChange={(_e, selected) => {
                setSelectedWriters(selected);
                setWriterIds(selected.map((w) => w.id));
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ m: 1, width: 'calc(100% - 16px)' }}
              renderOption={(props, option) => {
                // eslint-disable-next-line react/prop-types
                const { key, ...rest } = props;
                return <li key={key} {...rest}>{[option.name, option.surname].filter(Boolean).join(' ')}</li>; // eslint-disable-line react/jsx-props-no-spreading
              }}
              renderTags={(value, getTagProps) => value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <Chip key={key} label={[option.name, option.surname].filter(Boolean).join(' ')} size="small" {...tagProps} />;
              })}
              renderInput={(params) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <TextField {...params} label={t('book.fields.author')} variant="outlined" />
              )}
            />
          </div>
        )}
        <div className="create-book__input">
          <FormControlLabel
            control={(
              <Switch
                checked={wantToRead}
                onChange={(e) => setWantToRead(e.target.checked)}
              />
            )}
            label={t('book.fields.wantToRead')}
            sx={{ ml: 1 }}
          />
        </div>
        {!wantToRead && (
          <div className="create-book__input">
            <Input onChange={(e) => onReadChange(e.target.value)} id="year_read" inputLabel={t('book.fields.yearRead')} />
          </div>
        )}
        <div className="create-book__input">
          <Input onChange={(e) => onDecriptionChange(e.target.value)} id="description" inputLabel={t('book.fields.description')} />
        </div>
        <div className="create-book__button">
          <SaveButton onClick={handleSave} disabled={loading}>
            {t('common.save')}
          </SaveButton>
        </div>
        {error && (
          <div>
            <ErrorMessage error={error} />
          </div>
        )}
      </div>
    </div>
  );
};

CreateBook.propTypes = {
  writerId: PropTypes.string,
  initialWantToRead: PropTypes.bool,
  onSuccess: PropTypes.func,
};

export default CreateBook;
