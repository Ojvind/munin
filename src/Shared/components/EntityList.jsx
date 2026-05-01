import React from 'react';
import PropTypes from 'prop-types';
import {
  DataGrid, itIT, svSE, enUS,
} from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import FetchMore from '../../FetchMore';

const LOCALE_MAP = { it: itIT, sv: svSE, en: enUS };

const DEFAULT_ROW_HEIGHT = 52;

const EntityList = ({
  entities,
  loading,
  fetchMore,
  columns,
  entityName,
  className = '',
  pageSize = 100,
  rowsPerPageOptions = [50, 100],
  checkboxSelection = false,
  disableSelectionOnClick = false,
  rowHeight = DEFAULT_ROW_HEIGHT,
  initialState = {},
  children = null,
}) => {
  const { i18n } = useTranslation();
  const locale = LOCALE_MAP[i18n.language] || itIT;

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    return {
      ...previousResult,
      [entityName]: {
        ...previousResult[entityName],
        ...fetchMoreResult[entityName],
        edges: [
          ...previousResult[entityName].edges,
          ...fetchMoreResult[entityName].edges,
        ],
      },
    };
  };

  return (
    <div className={className} style={{ minWidth: 0, overflowX: 'hidden' }}>
      <DataGrid
        className={`${className}__datagrid`}
        rows={entities.edges}
        columns={columns}
        rowHeight={rowHeight}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={disableSelectionOnClick}
        localeText={locale.components.MuiDataGrid.defaultProps.localeText}
        initialState={initialState}
        autoHeight
        sx={{
          '& .MuiDataGrid-columnHeaders': { overflow: 'visible !important' },
          '& .MuiDataGrid-columnHeader': { overflow: 'visible !important' },
          '& .MuiDataGrid-columnHeaderDraggableContainer': { overflow: 'visible !important' },
          '& .MuiDataGrid-columnHeadersInner': { paddingRight: '24px' },
          '& .MuiDataGrid-menuIcon': { visibility: 'visible', width: 'auto' },
          '& .MuiDataGrid-columnHeader--sortable .MuiDataGrid-iconButtonContainer': {
            visibility: 'visible',
            width: 'auto',
          },
          '& .MuiDataGrid-sortIcon': { opacity: 1 },
          '& .MuiDataGrid-iconSeparator': { display: 'none' },
          '& .MuiDataGrid-columnHeader:nth-of-type(even)': { backgroundColor: 'rgba(0,0,0,0.03)' },
          '& .MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(even)': { backgroundColor: 'rgba(0,0,0,0.03)' },
        }}
      />
      <FetchMore
        loading={loading}
        hasNextPage={entities.pageInfo.hasNextPage}
        variables={{
          cursor: entities.pageInfo.endCursor,
        }}
        updateQuery={updateQuery}
        fetchMore={fetchMore}
      >
        {children}
      </FetchMore>
    </div>
  );
};

EntityList.propTypes = {
  entities: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired,
      endCursor: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    headerName: PropTypes.string,
    width: PropTypes.number,
    renderCell: PropTypes.func,
  })).isRequired,
  entityName: PropTypes.string.isRequired,
  className: PropTypes.string,
  pageSize: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  checkboxSelection: PropTypes.bool,
  disableSelectionOnClick: PropTypes.bool,
  rowHeight: PropTypes.number,
  initialState: PropTypes.shape({}),
  children: PropTypes.node,
};

export default EntityList;
