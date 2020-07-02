import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from './table';

function TabPanel(props) {
  const { children, value, index, padding = 3, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={padding}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default () => {
  const { goals } = useSelector(state => ({
    goals: state.goals,
  }));
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = React.useCallback((event, value) => setTabValue(value), [setTabValue]);
  const goalsChange = React.useCallback(e => dispatch({ type: 'setGoals', goals: e.target.value }), [dispatch]);

  return (
    <Paper>
      <AppBar position="static" color="default">
        <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="User Stories" />
          <Tab label="Goals" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0} padding={0}>
        <Table />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TextField value={goals} onChange={goalsChange} variant="outlined" multiline style={{ width: '100%' }} />
      </TabPanel>
    </Paper>
  );
};