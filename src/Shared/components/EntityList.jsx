import React from 'react';
import PropTypes from 'prop-types';
import {
  DataGrid, itIT, svSE, enUS,
} from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import FetchMore from '../../FetchMore';

const LOCALE_MAP = { it: itIT, sv: svSE, en: enUS };

const EntityList = ({
  entities,
  loading,
  fetchMore,
  columns,
  entityName,
  className,
  pageSize,
  rowsPerPageOptions = [50, 100],
  checkboxSelection = false,
  disableSelectionOnClick = false,
  height = '60em',
  children,
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
    <div className={className}>
      <DataGrid
        className={`${className}__datagrid`}
        rows={entities.edges}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={disableSelectionOnClick}
        localeText={locale.components.MuiDataGrid.defaultProps.localeText}
        autoHeight={false}
        sx={{
          height: `${height}`,
          maxHeight: `${height}`,
          '& .MuiDataGrid-root': {
            height: `${height}`,
            maxHeight: `${height}`,
          },
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
          '& .MuiDataGrid-columnHeader:nth-child(even)': { backgroundColor: 'rgba(0,0,0,0.03)' },
          '& .MuiDataGrid-row .MuiDataGrid-cell:nth-child(even)': { backgroundColor: 'rgba(0,0,0,0.03)' },
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
  height: PropTypes.string,
  children: PropTypes.node,
};

EntityList.defaultProps = {
  className: '',
  pageSize: 100,
  rowsPerPageOptions: [50, 100],
  checkboxSelection: false,
  disableSelectionOnClick: false,
  height: '60em',
  children: null,
};

export default EntityList;
