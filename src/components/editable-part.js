import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from './table';
import TabPanel from './tab-panel';

export default () => {
  const { goals, additional } = useSelector(state => ({
    goals: state.goals,
    additional: state.additional,
  }));
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = React.useCallback((event, value) => setTabValue(value), [setTabValue]);
  const goalsChange = React.useCallback(e => dispatch({ type: 'setGoals', goals: e.target.value }), [dispatch]);
  const additionalChange = React.useCallback(e => dispatch({ type: 'setAdditional', additional: e.target.value }), [dispatch]);

  return (
    <Paper>
      <AppBar position="static" color="default">
        <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="User Stories" />
          <Tab label="Goals" />
          <Tab label="Additional" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0} padding={0} style={{ height: '85vh' }}>
        {/* workaround for tab panel shadow */}
        <div style={{ height: '10px', width: '100%' }} />
        <Table />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TextField value={goals} onChange={goalsChange} autoFocus variant="outlined" multiline style={{ width: '100%' }} placeholder="Goals here..." />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <TextField value={additional} onChange={additionalChange} autoFocus variant="outlined" multiline style={{ width: '100%' }} placeholder="Additional data here..." />
      </TabPanel>
    </Paper>
  );
};