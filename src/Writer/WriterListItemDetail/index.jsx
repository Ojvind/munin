import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import Container from '../../Shared/Container';

import { GET_WRITER } from '../queries';
import Loading from '../../Shared/components/Loading';
import ErrorMessage from '../../Error';
import BookContainer from '../../Book';
import CreateBook from '../../Book/CreateBook';
import WriterListItemDetail from './WriterListItemDetail';

const WriterListItemDetailContainer = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_WRITER, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (loading) {
    return <Loading />;
  }
  if (!data?.writer) {
    return <ErrorMessage error={{ message: 'Writer not found' }} />;
  }
  return (
    <div>
      <div className="app-content_small-header">
        <WriterListItemDetail
          writer={data.writer}
        />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem',
        }}
        >
          <h2 style={{ margin: 0 }}>{t('nav.books')}</h2>
          <Button onClick={handleOpen}>{t('book.createNew')}</Button>
        </div>
        <BookContainer
          writerId={data.writer.id}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container>
            <CreateBook writerId={data.writer.id} onSuccess={handleClose} />
          </Container>
        </Modal>
      </div>
    </div>
  );
};

export default WriterListItemDetailContainer;
