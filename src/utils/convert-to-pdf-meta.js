import { convertToStory } from './convert-to-story';

const styles = {
  header: {
    fontSize: 18,
    bold: true,
  },
  subheader: {
    fontSize: 15,
    bold: true,
    margin: [0, 15]
  },
  tableHeader: {
    bold: true,
    fontSize: 13,
    color: 'black'
  }
};

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const convertToPdfMeta = (storyName, goals, additional, stories) => {
  const content = [];
  let images = {};

  content.push({ text: storyName, style: 'header' });
  
  if (!!goals && goals.length) {
    content.push({ text: 'Goals', style: 'subheader' });
    content.push({ text: goals });
  }
  
  content.push({ text: 'User Stories', style: 'subheader' });
  content.push({
    ol: stories.reduce((acc, story) => {
      acc.push(convertToStory(story));
      if (story.imgUrl) {
        acc.push({ image: story.id, fit: [520, 520], alignment: 'center' });
        images = { ...images, [story.id]: story.imgUrl };
      }
      return acc;
    }, []),
  });

  content.push({ text: 'Acceptance Criteria & Tests', style: 'subheader' });
  content.push({ layout: 'lightHorizontalLines', table: {
      widths: [20, 100, '*'],
      body: [
        [{ text: 'ID', style: 'tableHeader', alignment: 'center' }, { text: 'Criteria', style: 'tableHeader' }, { text: 'Test', style: 'tableHeader' }],
        ...stories.reduce((acc, story, storyIndex) => {
          acc.push([
            { text: (storyIndex + 1).toString(), alignment: 'center' },
            `${capitalize(story.purpose)}.`,
            story.tests.map((test, testIndex) => `${testIndex + 1}. ${test.text}.`).join(' '),
          ]);
          return acc;
        }, []),
      ]
    }
  });

  if (!!additional && additional.length) {
    content.push({ text: 'Additional', style: 'subheader' });
    content.push({ text: additional });
  }

  return { content, styles, images };
};