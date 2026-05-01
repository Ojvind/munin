import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Loading from '../Shared/components/Loading';
import Button from '../Shared/components/BaseButton';

const FetchMore = ({
  loading, hasNextPage, variables, updateQuery, fetchMore, children = ' ',
}) => {
  const { t } = useTranslation();
  return (
    <div className="FetchMore">
      {loading ? (
        <Loading />
      ) : (
        hasNextPage && (
          <Button
            className="FetchMore-button"
            onClick={() => fetchMore({ variables, updateQuery })}
          >
            {t('common.more')}
            {' '}
            {children}
          </Button>
        )
      )}
    </div>
  );
};

FetchMore.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  variables: PropTypes.shape({}).isRequired,
  updateQuery: PropTypes.func.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string,
};

export default FetchMore;
