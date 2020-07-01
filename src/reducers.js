import { v4 as uuidv4 } from 'uuid';

const defaultStoryName = 'Untitled Stories';

const initialState = {
  storyName: defaultStoryName,
  stories: [{
    id: uuidv4(),
    role: 'Story Tailer',
    action: 'make stories',
    purpose: 'make my work more convenient',
    tests: [{
      id: uuidv4(),
      text: 'Open Story Creator App'
    }, {
      id: uuidv4(),
      text: 'Enjoy 😃',
    }]
  }],
}

const getEmptyStory = () => ({
  id: uuidv4(),
  role: '',
  action: '',
  purpose: '',
  tests: [],
});

const getEmptyTest = (text) => ({
  id: uuidv4(),
  text,
});


export default (state = initialState, action) => {
  switch (action.type) {
    case 'setStoryName': {
      if (action.storyName.trim() === '') {
        return { ...state, storyName: defaultStoryName };
      }
      return { ...state, storyName: action.storyName };
    }
    case 'setStories': {
      return { ...state, stories: action.stories };
    }
    case 'addStory': { // OK
      return {
        ...state,
        stories: [...state.stories, getEmptyStory()] 
      };
    }
    case 'deleteStory': { // OK
      const deletedSet = new Set(action.deleted);
      const nextStories = state.stories.filter(row => !deletedSet.has(row.id));

      return {
        ...state,
        stories: nextStories,
      };
    }
    case 'changeStory': { // OK
      const nextStories = state.stories.map(row => (action.changed[row.id] ? { ...row, ...action.changed[row.id] } : row));
      return {
        ...state, stories: nextStories,
      };
    }
    case 'addTest': { //OK
      const nextStories = state.stories.reduce((acc, story) => {
        if (action.storyId === story.id) {
          story.tests.push(getEmptyTest(action.text));
        }
        acc.push(story);
        return acc;
      }, []);

      return {
        ...state, stories: nextStories,
      };
    }
    case 'deleteTest': { // OK
      const nextStories = state.stories.map((story) => {
        if (story.id === action.storyId) {
          story.tests = story.tests.filter(test => test.id !== action.testId);
        } return story;
      });

      return {
        ...state, stories: nextStories,
      };
    }
    default:
      return state;
  }
}