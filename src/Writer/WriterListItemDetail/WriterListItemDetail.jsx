import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
                <div className="list-item-detail__row">
                  <div className="list-item-detail__row__column">
                    <Tooltip
                      title={(
                        <img
                          src={avatarURL}
                          alt="Avatar"
                          style={{
                            width: '400px',
                            height: 'auto',
                            maxHeight: '600px',
                            objectFit: 'contain',
                            display: 'block',
                          }}
                        />
                      )}
                      placement="right"
                      arrow
                    >
                      <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                      >
                        <img
                          src={avatarURL}
                          alt="Avatar"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            display: 'block',
                          }}
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <div className="list-item-detail__row__column">
                    <Label
                      variant="h5"
                    >
                      {`${writer.name} ${writer.surname}`}
                    </Label>
                    <span className="Footer-text">{t('writer.readMore')}</span>
                    {' '}
                    <Link
                      href={writer.homepage}
                    >
                      {t('writer.here')}
                    </Link>
                    <br />
                    <br />
                    <img
                      className="list-item-detail__icon"
                      alt={nationality}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality}.svg`}
                    />
                  </div>
                </div>
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
  }).isRequired,
};

export default WriterListItemDetail;
