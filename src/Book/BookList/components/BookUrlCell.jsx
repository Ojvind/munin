import React from 'react';
import PropTypes from 'prop-types';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import linkImage from '../../../assets/www.white.png';

const HtmlTooltip = styled(Tooltip)(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    border: '1px solid #dadde9',
  },
}));

const BookUrlCell = ({ params }) => (
  <HtmlTooltip
    title={(
      <>
        <Typography color="inherit">{params.value}</Typography>
        <em>opens in a new</em>
        <b> tab...</b>
      </>
    )}
    placement="top"
    arrow
  >
    <a target="_new" href={params.value} rel="noopener noreferrer">
      <img
        src={linkImage}
        alt="URL to homepage"
        width="20px"
      />
    </a>
  </HtmlTooltip>
);

BookUrlCell.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookUrlCell;
