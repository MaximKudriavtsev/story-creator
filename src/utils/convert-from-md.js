import { v4 as uuidv4 } from 'uuid';

const removeEmptyRows = (lines) => {
  return lines.reduce((acc, line) => {
    line && acc.push(line);
    return acc;
  }, []);
};

export const convertFromMD = (fileString) => {
  const contentLines = removeEmptyRows(fileString.split('\n'));
  let name = '';
  const goals = [];
  const additional = [];
  const stories = [];

  contentLines.forEach((line, index) => {
    if (!name && line.indexOf('##') > -1) { // name
      name = line.replace('##', '').trim();
    }
    if (line.indexOf('#### Goals') > -1) { // goals
      for (let i = index + 1; i < contentLines.length && contentLines[i].indexOf('#') < 0 ; i ++) {
        goals.push(contentLines[i].trim());
      }
    }
    if (line.indexOf('#### Additional') > -1) { // additional
      for (let i = index + 1; i < contentLines.length && contentLines[i].indexOf('#') < 0 ; i ++) {
        additional.push(contentLines[i].trim());
      }
    }
    if (line.indexOf('#### User Stories') > -1) { // user stories
      // 1. As a user, I want to be able to see a list of all available product previews, so that I can make a good choice for me.
      for (let i = index + 1; i < contentLines.length && contentLines[i].indexOf('#') < 0 ; i ++) {
        const story = contentLines[i];
        const role = story.substring(8, story.indexOf(', I want to'));
        const action = story.substring(story.indexOf(' I want to be able to ') + 22, story.indexOf(', so that I can '));
        const purpose = story.substring(story.indexOf(', so that I can ') + 16).replace('.', '');
        const tests = [];
        stories.push({
          id: uuidv4(),
          role,
          action,
          purpose,
          tests,
        });
      }
    }

    if (line.indexOf('#### Acceptance Criteria & Tests') > -1) { // tests
      // #### Acceptance Criteria & Tests\n| ID | Criteria | Test |\n| -- | :------- | :--- |\n| 1 | Capability to see a list of all available product previews. | 1. Navigate to the `gallery` page. |
      let isTest = false;
      for (let i = index + 1; i < contentLines.length && contentLines[i].indexOf('#') < 0; i ++) {
        const testLine = contentLines[i];
        if (testLine.indexOf('| 1 |') > -1) {
          isTest = true;
        }
        if (isTest) {
          const [lineIndex, , tests] = testLine.split(' | ');
          const storyIndex = Number(lineIndex.substring(2)) - 1;
          
          for (let i = 1; tests.indexOf(`${i}. `) > -1; i++) {
            const lastIndex = tests.indexOf(`${i + 1}. `);
            const text = tests.substring(tests.indexOf(`${i}. `) + 3, lastIndex > -1 ? lastIndex - 2 : tests.length - 3);
            stories[storyIndex].tests.push({
              id: uuidv4(),
              text,
            })
          }
        }
      }
    }
  });

  return {
    stories,
    name,
    goals: goals.join('\n'),
    additional: additional.join('\n'),
  };
};