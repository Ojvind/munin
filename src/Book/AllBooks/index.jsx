import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import BookList from '../BookList';
import CreateBook from '../CreateBook';

import { GET_ALL_BOOKS } from '../queries';

import Loading from '../../Shared/components/Loading';
import ErrorMessage from '../../Error';
import Container from '../../Shared/Container';

const AllBooksContainer = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const {
    data, loading, error, fetchMore,
  } = useQuery(GET_ALL_BOOKS, {
    notifyOnNetworkStatusChange: true,
  });

  // Automatically load all books to make them searchable
  useEffect(() => {
    if (data?.allBooks?.pageInfo?.hasNextPage && !loading) {
      const updateQuery = (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          ...previousResult,
          allBooks: {
            ...previousResult.allBooks,
            ...fetchMoreResult.allBooks,
            edges: [
              ...previousResult.allBooks.edges,
              ...fetchMoreResult.allBooks.edges,
            ],
          },
        };
      };

      fetchMore({
        variables: {
          cursor: data.allBooks.pageInfo.endCursor,
        },
        updateQuery,
      });
    }
  }, [data?.allBooks?.pageInfo?.hasNextPage,
    data?.allBooks?.pageInfo?.endCursor,
    loading,
    fetchMore]);

  const filteredBooks = useMemo(() => {
    if (!data?.allBooks) return null;
    let { edges } = data.allBooks;
    if (filter === 'wantToRead') edges = edges.filter((b) => b.wantToRead);
    else if (filter === 'read') edges = edges.filter((b) => !b.wantToRead && b.yearRead);
    return { ...data.allBooks, edges };
  }, [data, filter]);

  if (loading && !data) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data || !filteredBooks) {
    return <Loading />;
  }
  return (
    <div className="app-content_small-header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>{t('nav.books')}</h2>
        <Button onClick={() => setOpen(true)}>{t('book.createNew')}</Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Container>
          <CreateBook
            initialWantToRead={filter === 'wantToRead'}
            onSuccess={() => setOpen(false)}
          />
        </Container>
      </Modal>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_, v) => { if (v) setFilter(v); }}
        size="small"
        sx={{ mb: 2 }}
      >
        <ToggleButton value="all">
          <FormatListBulletedIcon fontSize="small" sx={{ mr: 0.5 }} />
          {t('book.filter.all')}
        </ToggleButton>
        <ToggleButton value="wantToRead">
          <BookmarkIcon fontSize="small" sx={{ mr: 0.5 }} />
          {t('book.filter.wantToRead')}
        </ToggleButton>
        <ToggleButton value="read">
          <MenuBookIcon fontSize="small" sx={{ mr: 0.5 }} />
          {t('book.filter.read')}
        </ToggleButton>
      </ToggleButtonGroup>
      <BookList
        books={filteredBooks}
        loading={loading}
        fetchMore={fetchMore}
      />
    </div>
  );
};

export default AllBooksContainer;
