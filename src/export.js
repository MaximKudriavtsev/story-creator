import * as React from 'react';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

// { name: 'id', title: '#id' },
// { name: 'role', title: 'Role' },
// { name: 'action', title: 'Action' },
// { name: 'purpose', title: 'Purpose' },

const generateMD = (data) => {
  const result = ['#### User Stories\n'];

  data.forEach((story, id) => {
    result.push(`${id + 1}. As a ${story.role}, I want to be able to ${story.action}, so that I can ${story.purpose}.`);
  });

  result.push('\n#### Acceptance Criteria & Tests');
  result.push('\n| ID | Criteria | Test |');

  data.forEach((story, id) => {
    const tableLine = `| ${id + 1} | Capability to ${story.action}. | ${story.tests.map((test, testId) => `${testId + 1}. ${test.text}. `).join('')} |`;
    result.push(tableLine);
  });

  return result.join('\n');
};

export default () => {
  const stories = useSelector(state => state.stories);

  const exportMD = React.useCallback(() => {
    const filename = "data.md";
    const mdData = generateMD(stories);

    const blob = new Blob([mdData], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, filename);
  }, [stories]);

  return (
    <React.Fragment>
      <p style={{ marginTop: '21px' }}>
        <Paper>
          <TextField value={generateMD(stories)} variant="outlined" multiline style={{ width: '100%' }} />
        </Paper>
      </p>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '14px' }}>
        <Button variant="outlined" color="primary" onClick={exportMD}>
          Export md file
        </Button>
      </div>
    </React.Fragment>
  );
};