import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import BookImageCell from '../components/BookImageCell';
import BookUrlCell from '../components/BookUrlCell';
import BookDeleteCell from '../components/BookDeleteCell';

const useBookColumns = () => {
  const { t } = useTranslation();
  return [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip title={params.row.id} placement="top" arrow>
          <Link to={`/book/${params.row.id}/${params.row.title}`}>
            {params.row.id.substring(0, 3)}
            ...
          </Link>
        </Tooltip>
      ),
    },
    {
      field: 'title',
      headerName: t('book.fields.title'),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'url',
      headerName: ' ',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => <BookUrlCell params={params} />,
    },
    { field: 'yearPublished', headerName: t('book.fields.yearPublished'), width: 80 },
    { field: 'yearRead', headerName: t('book.fields.yearRead'), width: 80 },
    {
      field: 'portraitimageurl',
      headerName: ' ',
      width: 72,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => <BookImageCell params={params} />,
    },
    {
      field: 'delete',
      headerName: ' ',
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => <BookDeleteCell params={params} />,
    },
  ];
};

export default useBookColumns;
