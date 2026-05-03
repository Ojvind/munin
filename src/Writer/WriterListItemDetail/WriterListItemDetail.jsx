import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { useMutation } from '@apollo/client';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import Input from '../../Shared/components/Input';
import Label from '../../Shared/components/Label';
import Link from '../../Shared/components/Link';
import SaveButton from '../../Shared/components/SaveButton';
import RichTextEditor from '../../Shared/components/RichTextEditor';
import { useImageUpload } from '../../Shared/hooks/useImageUpload';

import { UPDATE_WRITER } from '../mutations';
import { GET_WRITER } from '../queries';
import ErrorMessage from '../../Error';

function WriterListItemDetail(props) {
  const { writer } = props;

  const [edit, toggleEdit] = useState(false);
  const { t } = useTranslation();
  const [name, onNameChange] = useState(writer.name);
  const [surname, onSurnameChange] = useState(writer.surname);
  const [homepage, onHomepageChange] = useState(writer.homepage);
  const [nationality, onNationalityChange] = useState(writer.nationality);
  const [description, onDescriptionChange] = useState(writer.description);

  const {
    avatarURL,
    portraitimageurl,
    fileUploadRef,
    handleImageUpload,
    uploadImageDisplay,
  } = useImageUpload(writer.portraitimageurl);

  const [updateWriter, { error: mutationError }] = useMutation(UPDATE_WRITER, {
    refetchQueries: [
      {
        query: GET_WRITER,
        variables: {
          id: writer.id,
        },
      },
    ],
  });

  return (
    <div>
      <div
        className="list-item-detail"
        style={{ position: 'relative' }}
      >
        {
          (!edit)
            ? (
              <div className="full-width">
                <IconButton
                  size="small"
                  onClick={() => toggleEdit(true)}
                  style={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <div className="list-item-detail__compact">
                  <Tooltip
                    enterDelay={0}
                    enterNextDelay={0}
                    title={(
                      <img
                        src={avatarURL}
                        alt="Avatar"
                        style={{
                          maxWidth: 320,
                          maxHeight: 400,
                          width: 'auto',
                          height: 'auto',
                          display: 'block',
                          borderRadius: 4,
                        }}
                      />
                    )}
                    componentsProps={{ tooltip: { sx: { background: 'none', p: 0, boxShadow: 3 } } }}
                  >
                    <img
                      src={avatarURL}
                      alt="Avatar"
                      className="list-item-detail__compact-portrait"
                    />
                  </Tooltip>
                  <div className="list-item-detail__compact-meta">
                    <div className="list-item-detail__compact-header">
                      <Label variant="h4">{`${writer.name} ${writer.surname}`}</Label>
                      {nationality && (
                        <img
                          className="list-item-detail__compact-flag"
                          alt={nationality}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality}.svg`}
                        />
                      )}
                    </div>
                    {writer.homepage && (
                      <div className="list-item-detail__compact-link">
                        <span>{t('writer.readMore')}</span>
                        {' '}
                        <Link href={writer.homepage}>{t('writer.here')}</Link>
                      </div>
                    )}
                  </div>
                </div>
                {writer.description && (
                  // eslint-disable-next-line react/no-danger
                  <div className="list-item-detail__description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(writer.description) }} />
                )}
              </div>
            )
            : (
              <div className="list-item-detail__wrapper">
                <img
                  src={avatarURL}
                  alt="Avatar"
                  width="20%"
                />
                <form id="form" encType="multipart/form-data">
                  <Button
                    onClick={handleImageUpload}
                  >
                    {t('common.setImage')}
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
                <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel={t('writer.fields.name')} value={name} />
                <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel={t('writer.fields.surname')} value={surname} />
                <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel={t('writer.fields.homepage')} value={homepage} />
                <Input onChange={(e) => onNationalityChange(e.target.value)} id="nationality" inputLabel={t('writer.fields.nationality')} value={nationality} />
                <RichTextEditor label={t('writer.fields.description')} value={description} onChange={onDescriptionChange} />
                <div className="list-item-detail__row list-item-detail__row__button">
                  <SaveButton
                    onClick={async () => {
                      try {
                        await updateWriter({
                          variables: {
                            id: writer.id,
                            name,
                            surname,
                            homepage,
                            portraitimageurl,
                            nationality,
                            description,
                          },
                        });
                        toggleEdit(!edit);
                      } catch (e) {
                        // Error will be shown by mutationError
                      }
                    }}
                  >
                    Salva
                  </SaveButton>
                </div>
                {mutationError && (
                  <div>
                    <ErrorMessage error={mutationError} />
                  </div>
                )}
              </div>
            )
        }
      </div>
    </div>
  );
}

WriterListItemDetail.propTypes = {
  writer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    homepage: PropTypes.string,
    nationality: PropTypes.string,
    portraitimageurl: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default WriterListItemDetail;
