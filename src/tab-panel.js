import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default ({ children, value, index, padding = 3 }) => (
  <div
    hidden={value !== index}
    id={`scrollable-auto-tabpanel-${index}`}
  >
    {value === index && (
      <Box p={padding}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);