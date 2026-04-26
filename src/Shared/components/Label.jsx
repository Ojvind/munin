import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.elevated || '#f5f5f9',
    color: theme.palette.text.primary,
    maxWidth: 250,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

const Label = ({
  variant,
  isLink,
  url,
  className,
  toolTip, // eslint-disable-line no-unused-vars
  children,
  ...rest // eslint-disable-line react/jsx-props-no-spreading
}) => {
  if (isLink) {
    return (
      <Typography
        variant={variant}
        {...rest} // eslint-disable-line react/jsx-props-no-spreading
      >
        <HtmlTooltip
          title={(
            <>
              <Typography color="inherit">
                {url}
              </Typography>
              <em>opens in a new</em>
              <b> tab...</b>
            </>
          )}
          placement="top"
          arrow
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={url}
          >
            {children}
          </a>
        </HtmlTooltip>
      </Typography>
    );
  }
  return (
    <Typography
      variant={variant}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    >
      {` ${children} `}
    </Typography>
  );
};

Label.propTypes = {
  variant: PropTypes.string,
  isLink: PropTypes.bool,
  url: PropTypes.string,
  toolTip: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Label.defaultProps = {
  variant: 'h1',
  isLink: false,
  url: '',
  toolTip: '',
  className: '',
};

export default Label;
