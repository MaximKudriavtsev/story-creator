import Image from './components/image';
import EditingImage from './components/editing-image';
import DownloadImage from './components/download-image';

export default [
  {
    image: Image,
    title: 'Generates MD file with your User Stories.',
    text: 'You do not need to think about formatting your documents, the application will add all the necessary headings and necessary indents automatically.',
  },
  {
    image: EditingImage,
    title: 'Easy editing of your user stories.',
    text: 'The application provides ample opportunities for editing your data. You can add add new and delete and modify old user stories, as well as change their sequence number.',
  },
  {
    image: DownloadImage,
    title: 'Saving and loading.',
    text: 'You can save the document when you have finished work to your computer and load an existing document to edit it.',
  },
];