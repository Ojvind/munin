import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
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

const WriterUrl = ({ params }) => (
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
    <a
      target="_new"
      href={params.value}
    >
      <img
        src={linkImage}
        alt="URL to homepage"
        width="20px"
      />
    </a>
  </HtmlTooltip>
);

WriterUrl.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default WriterUrl;
