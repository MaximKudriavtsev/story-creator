import * as React from 'react';
import Box from '@material-ui/core/Box';

export default ({ children, value, index, padding = 3, style }) => (
  <div
    id={index}
    hidden={value !== index}
    style={{ maxHeight: '85vh', overflow: 'auto', ...style }}
  >
    {value === index && (
      <Box p={padding} height="100%">
        {children}
      </Box>
    )}
  </div>
);