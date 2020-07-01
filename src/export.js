import * as React from 'react';
// import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import marked from 'marked';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import TabPanel from '@material-ui/core/TabPanel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// { name: 'id', title: '#id' },
// { name: 'role', title: 'Role' },
// { name: 'action', title: 'Action' },
// { name: 'purpose', title: 'Purpose' },

export const generateMD = (data, name) => {
  const result = [`## ${name}\n\n#### User Stories\n`];

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default () => {
  const { stories, storyName } = useSelector(state => ({
    stories: state.stories, storyName: state.storyName,
  }));
  const markdown = generateMD(stories, storyName);
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = React.useCallback((event, value) => setTabValue(value), [setTabValue]);

  // const exportMD = React.useCallback(() => {
  //   const filename = "data.md";

  //   const blob = new Blob([markdown], {
  //     type: 'text/plain;charset=utf-8'
  //   });

  //   saveAs(blob, filename);
  // }, [markdown]);

  return (
    <React.Fragment>
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
      {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '14px' }}>
        <Button variant="outlined" color="primary" onClick={exportMD}>
          Export md file
        </Button>
      </div> */}
    </React.Fragment>
  );
};