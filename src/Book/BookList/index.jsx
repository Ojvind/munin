/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import EntityList from '../../Shared/components/EntityList';
import useBookColumns from './config/columns';

const BookList = ({
  books, loading, fetchMore, compact = false,
}) => {
  const { t } = useTranslation();
  const columns = useBookColumns();
  return (
    <EntityList
      entities={books}
      loading={loading}
      fetchMore={fetchMore}
      columns={columns}
      entityName="books"
      className="book-list"
      pageSize={100}
      maxRows={compact ? 8 : null}
      rowHeight={72}
    >
      {t('nav.books')}
    </EntityList>
  );
};

BookList.propTypes = {
  books: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({})),
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool,
      endCursor: PropTypes.string,
    }),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  compact: PropTypes.bool,
};

BookList.defaultProps = {
  compact: false,
};

export default BookList;
