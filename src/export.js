import * as React from 'react';
import { saveAs } from 'file-saver';

// { name: 'id', title: '#id' },
// { name: 'role', title: 'Role' },
// { name: 'action', title: 'Action' },
// { name: 'result', title: 'Result' },

const generateMD = (data) => {
  const result = ['#### User Stories\n'];

  data.forEach(story => {
    result.push(`${story.id}. As a ${story.role}, I want to be able to ${story.action} so that to ${story.result}.`);
  });

  return result.join('\n');
};

export default ({ data }) => {
  const exportMD = React.useCallback(() => {
    const filename = "data.md";
    const mdData = generateMD(data);

    const blob = new Blob([mdData], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, filename);
  }, [data]);

  return (
    <button onClick={exportMD}>
      Export md file
    </button>
  );
};