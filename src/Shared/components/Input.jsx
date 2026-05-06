import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const Input = ({
  id = null, // eslint-disable-line no-unused-vars
  name = null,
  inputLabel = '',
  multiline = false,
  ...rest // eslint-disable-line react/jsx-props-no-spreading
}) => (
  <>
    {!multiline && (
      <TextField
        id="outlined-basic"
        label={inputLabel}
        variant="outlined"
        sx={{ m: 1, width: 'calc(100% - 16px)' }}
        {...rest} // eslint-disable-line react/jsx-props-no-spreading
      >
        {name}
      </TextField>
    )}
    {multiline && (
      <TextField
        multiline
        maxRows={4}
        id="outlined-basic"
        label={inputLabel}
        variant="outlined"
        sx={{ m: 1, width: 'calc(100% - 16px)' }}
        {...rest} // eslint-disable-line react/jsx-props-no-spreading
      >
        {name}
      </TextField>
    )}
  </>
);

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  inputLabel: PropTypes.string,
  // validated: PropTypes.bool,
  // valid: PropTypes.bool,
  multiline: PropTypes.bool,
  // shouldCustomValidate: PropTypes.bool,
  // customValid: PropTypes.bool,
};

export default Input;
