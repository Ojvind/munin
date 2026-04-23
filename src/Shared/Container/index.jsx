import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const Container = React.forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '1px solid #000',
      borderRadius: 2,
      boxShadow: 24,
      p: 4,
    }}
  >
    {children}
  </Box>
));

Container.displayName = 'Container';

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
