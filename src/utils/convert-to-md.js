export default (data, name, goals, additional) => {
  const result = [`## ${name}`];
  !!goals.trim() && result.push(`\n#### Goals\n\n${goals.trim()}`);
  result.push('\n#### User Stories\n');

  data.forEach((story, id) => {
    result.push(`${id + 1}. As a ${story.role.trim()}, I want to be able to ${story.action.trim()}, so that I can ${story.purpose.trim()}.`);
    if (story.imgUrl) {
      result.push(`![](${story.imgUrl})`);
    }
  });

  result.push('\n#### Acceptance Criteria & Tests');
  result.push('\n| ID | Criteria | Test |');
  result.push('| :--: | :------- | :--- |');

  data.forEach((story, id) => {
    const tableLine = `| ${id + 1} | Capability to ${story.action.trim()}. | ${story.tests.map((test, testId) => `${testId + 1}. ${test.text.trim()}. `).join('')}|`;
    result.push(tableLine);
  });

  !!additional.trim() && result.push(`\n#### Additional\n\n${additional.trim()}`);

  return result.join('\n');
};