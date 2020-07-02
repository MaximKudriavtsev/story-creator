import * as React from 'react';
import { useSelector } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import marked from 'marked';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './tab-panel';

export const generateMD = (data, name, goals) => {
  const result = [`## ${name}\n\n#### Goals\n\n${goals}\n\n#### User Stories\n`];

  data.forEach((story, id) => {
    result.push(`${id + 1}. As a ${story.role}, I want to be able to ${story.action}, so that I can ${story.purpose}.`);
  });

  result.push('\n#### Acceptance Criteria & Tests');
  result.push('\n| ID | Criteria | Test |');
  result.push('| -- | :------- | :--- |');

  data.forEach((story, id) => {
    const tableLine = `| ${id + 1} | Capability to ${story.action}. | ${story.tests.map((test, testId) => `${testId + 1}. ${test.text}. `).join('')} |`;
    result.push(tableLine);
  });

  return result.join('\n');
};

export default () => {
  const { stories, storyName, goals } = useSelector(state => ({
    stories: state.stories,
    storyName: state.storyName,
    goals: state.goals,
  }));
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = React.useCallback((event, value) => setTabValue(value), [setTabValue]);
  const markdown = generateMD(stories, storyName, goals);

  return (
    <Paper>
      <AppBar position="static" color="default">
        <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Markdown" />
          <Tab label="Preview" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <TextField value={markdown} variant="outlined" multiline style={{ width: '100%' }} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <div dangerouslySetInnerHTML={{__html: marked(markdown) }} />
      </TabPanel>
    </Paper>
  );
};