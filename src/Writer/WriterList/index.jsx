/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import EntityList from '../../Shared/components/EntityList';
import useWriterColumns from './config/columns';

const ROW_HEIGHT = 52;
const HEADER_HEIGHT = 56;
const FOOTER_HEIGHT = 52;
const MAX_ROWS = 15;

const WriterList = ({ writers, loading, fetchMore }) => {
  const { t } = useTranslation();
  const columns = useWriterColumns();
  const height = `${Math.min(writers.edges.length, MAX_ROWS) * ROW_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT}px`;
  return (
    <EntityList
      entities={writers}
      loading={loading}
      fetchMore={fetchMore}
      columns={columns}
      entityName="writers"
      className="writer-list"
      pageSize={50}
      rowsPerPageOptions={[50, 100]}
      disableSelectionOnClick
      height={height}
    >
      {t('nav.writers')}
    </EntityList>
  );
};

WriterList.propTypes = {
  writers: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      surname: PropTypes.string,
      homepage: PropTypes.string,
      portraitimageurl: PropTypes.string,
      nationality: PropTypes.string,
    })).isRequired,
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired,
      endCursor: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default WriterList;
