import * as React from 'react';
import { useSelector } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import marked from 'marked';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './tab-panel';
import convertToMD from '../utils/convert-to-md';

export default () => {
  const { stories, storyName, goals, additional } = useSelector(state => ({
    stories: state.stories,
    storyName: state.storyName,
    goals: state.goals,
    additional: state.additional,
  }));
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = React.useCallback((event, value) => setTabValue(value), [setTabValue]);
  const markdown = convertToMD(stories, storyName, goals, additional);

  return (
    <Paper>
      <AppBar position="static" color="default">
        <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Preview" />
          <Tab label="Markdown" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TextField value={markdown} variant="outlined" multiline style={{ width: '100%' }} />
      </TabPanel>
    </Paper>
  );
};