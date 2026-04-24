import React from 'react';
import { useTranslation } from 'react-i18next';
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
      renderCell: (params) => <WriterLink params={params} />,
    },
    {
      field: 'fullName',
      headerName: t('writer.list.fullName'),
      sortable: false,
      width: 400,
      valueGetter: (params) => `${params.row.name || ''} ${params.row.surname || ''}`,
    },
    {
      field: 'homepage',
      headerName: 'WWW',
      width: 100,
      renderCell: (params) => <WriterUrl params={params} />,
    },
    {
      field: 'portraitimageurl',
      headerName: t('writer.list.portrait'),
      width: 100,
      renderCell: (params) => <WriterPortrait params={params} />,
    },
    {
      field: 'nationality',
      headerName: t('writer.list.nationality'),
      width: 100,
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
      renderCell: (params) => <DeleteWriterMutation writerId={`${params.row.id}`} />,
    },
  ];
};

export default useWriterColumns;
