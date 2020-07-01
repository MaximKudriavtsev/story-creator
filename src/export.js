import * as React from 'react';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import marked from 'marked';

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
  result.push('| -- | :------- | :--- |');

  data.forEach((story, id) => {
    const tableLine = `| ${id + 1} | Capability to ${story.action}. | ${story.tests.map((test, testId) => `${testId + 1}. ${test.text}. `).join('')} |`;
    result.push(tableLine);
  });

  return result.join('\n');
};

export default () => {
  const stories = useSelector(state => state.stories);
  const markdown = generateMD(stories);

  const exportMD = React.useCallback(() => {
    const filename = "data.md";

    const blob = new Blob([markdown], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, filename);
  }, [markdown]);

  return (
    <React.Fragment>
        <Paper>
          <TextField value={markdown} variant="outlined" multiline style={{ width: '100%' }} />
        </Paper>
        <Paper style={{ marginTop: '20px' }}>
          <p style={{ padding: '12px' }} dangerouslySetInnerHTML={{__html: marked(markdown) }} />
        </Paper>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '14px' }}>
        <Button variant="outlined" color="primary" onClick={exportMD}>
          Export md file
        </Button>
      </div>
    </React.Fragment>
  );
};