import preview from '../src/images/preview.png';
import editing from '../src/images/editing.png';
import download from '../src/images/upload-download.png';
import image from '../src/images/image.png';
import pdf from '../src/images/pdf.png';

export default [
  {
    image: preview,
    title: 'Generates a MD File According User Stories',
    text: 'You do not need to think about formatting your documents, the application will add all the necessary headings and necessary indents automatically. Copy the resulting MD text and attach it to your planning tool such as Trello or Gira.',
  },
  {
    image: editing,
    title: 'Easy User Stories Editing',
    text: 'The application provides ample opportunities for editing your data. You can add add new and delete and modify old user stories, as well as change their sequence number.',
  },
  {
    image: image,
    title: 'Add Mock-up Images to Your User Stories',
    text: 'Attach your feature mockup to your user story to better communicate your message to employees.',
  },
  {
    image: download,
    title: 'Saving and Loading',
    text: 'You can save the document when you have finished work to your computer and load an existing document to edit it.',
  },
  {
    image: pdf,
    title: 'Final PDF Document',
    text: 'After writing all user stories, you can create a PDF document with all data, including user stories, criteria and acceptance tests, as well as attached mockup images.',
  }
];