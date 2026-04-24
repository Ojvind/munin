import React from 'react';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import DeleteWriterMutation from '../../DeleteWriter';
import WriterPortrait from '../components/WriterPortrait';
import WriterUrl from '../components/WriterUrl';
import WriterLink from '../components/WriterLink';

const useWriterColumns = () => {
  const { t } = useTranslation();
  return [
    {
      field: 'id',
      headerName: 'ID',
      width: 10,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <WriterLink params={params} />,
    },
    {
      field: 'fullName',
      headerName: t('writer.list.fullName'),
      width: 400,
      renderHeader: () => (
        <Tooltip title={t('writer.list.sortByName')} placement="top">
          <span>{t('writer.list.fullName')}</span>
        </Tooltip>
      ),
      valueGetter: (params) => `${params.row.name || ''} ${params.row.surname || ''}`,
    },
    {
      field: 'homepage',
      headerName: ' ',
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <WriterUrl params={params} />,
    },
    {
      field: 'portraitimageurl',
      headerName: ' ',
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <WriterPortrait params={params} />,
    },
    {
      field: 'nationality',
      headerName: ' ',
      width: 100,
      renderHeader: () => (
        <Tooltip title={t('writer.list.sortByNationality')} placement="top">
          <span>🌍</span>
        </Tooltip>
      ),
      renderCell: (params) => (
        params.row.nationality ? (
          <img
            alt={params.row.nationality}
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${params.row.nationality}.svg`}
            width="30px"
          />
        ) : null
      ),
    },
    {
      field: 'delete',
      headerName: ' ',
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <DeleteWriterMutation writerId={`${params.row.id}`} />,
    },
  ];
};

export default useWriterColumns;
