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
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <WriterLink params={params} />,
    },
    {
      field: 'fullName',
      headerName: t('writer.list.fullName'),
      flex: 1,
      minWidth: 200,
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
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => <WriterUrl params={params} />,
    },
    {
      field: 'portraitimageurl',
      headerName: ' ',
      width: 72,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => <WriterPortrait params={params} />,
    },
    {
      field: 'nationality',
      headerName: ' ',
      width: 80,
      align: 'center',
      renderHeader: () => (
        <Tooltip title={t('writer.list.sortByNationality')} placement="top">
          <span>&nbsp;</span>
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
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => <DeleteWriterMutation writerId={`${params.row.id}`} />,
    },
  ];
};

export default useWriterColumns;
