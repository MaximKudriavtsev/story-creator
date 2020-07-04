import * as React from 'react';
import Box from '@material-ui/core/Box';

export default ({ children, value, index, padding = 3 }) => (
  <div
    id={index}
    hidden={value !== index}
    style={{ maxHeight: '85vh', overflow: 'auto' }}
  >
    {value === index && (
      <Box p={padding}>
        {children}
      </Box>
    )}
  </div>
);