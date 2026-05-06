import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Input from '../../Shared/components/Input';
import Label from '../../Shared/components/Label';
import SaveButton from '../../Shared/components/SaveButton';
import RichTextEditor from '../../Shared/components/RichTextEditor';
import { CREATE_WRITER } from '../mutations';
import { GET_WRITERS } from '../queries';

import './create-writer.css';
import ErrorMessage from '../../Error';

function CreateWriter({ onSuccess }) {
  const { t } = useTranslation();
  const [name, onNameChange] = useState('');
  const [surname, onSurnameChange] = useState('');
  const [homepage, onHomepageChange] = useState('');
  const [nationality, onNationalityChange] = useState('');
  const [description, onDescriptionChange] = useState('');

  const [createWriter, { loading, error }] = useMutation(CREATE_WRITER, {
    variables: {
      name,
      surname,
      homepage,
      portraitimageurl: '',
      nationality,
      description,
    },
    refetchQueries: [
      { query: GET_WRITERS },
    ],
  });

  const handleSave = async () => {
    try {
      await createWriter();
      onSuccess();
    } catch (e) {
      // Error will be shown by error prop
    }
  };

  return (
    <div>
      <Label variant="h4">{t('writer.createNew')}</Label>
      <div className="create-writer">
        <div className="create-writer__input">
          <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel={t('writer.fields.name')} />
        </div>
        <div className="create-writer__input">
          <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel={t('writer.fields.surname')} />
        </div>
        <div className="create-writer__input">
          <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel={t('writer.fields.homepage')} />
        </div>
        <div className="create-writer__input">
          <Input onChange={(e) => onNationalityChange(e.target.value)} id="nationality" inputLabel={t('writer.fields.nationality')} />
        </div>
        <div className="create-writer__input">
          <RichTextEditor label={t('writer.fields.description')} value={description} onChange={onDescriptionChange} />
        </div>
        <div className="create-writer__button">
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
}

CreateWriter.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CreateWriter;
