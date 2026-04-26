/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import EntityList from '../../Shared/components/EntityList';
import WriterMobileCard from './components/WriterMobileCard';
import useWriterColumns from './config/columns';

const WriterList = ({ writers, loading, fetchMore }) => {
  const { t } = useTranslation();
  const columns = useWriterColumns();
  const isMobile = useMediaQuery('(max-width:600px)');

  if (isMobile) {
    return (
      <div className="mobile-card-list">
        {writers.edges.map((writer) => (
          <WriterMobileCard key={writer.id} writer={writer} />
        ))}
      </div>
    );
  }

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
      maxRows={15}
      rowHeight={72}
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
