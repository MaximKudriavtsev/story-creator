import { v4 as uuidv4 } from 'uuid';
import store from 'store2';

const defaultStoryName = 'Untitled Stories';

const initialState = {
  storyName: defaultStoryName,
  goals: '',
  additional: '',
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

  isDialogOpen: false,
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

const getInitialState = () => {
  // const state = Cookies.get('state');
  const state = store.get('state');
  if (state) return state;
  return initialState;
};

const saveToStorage = (state) => {
  // Cookies.set('state', state, { sameSite: 'None' });
  store.set('state', state, true);
  return state;
};

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'resetData': {
      // Cookies.remove('state');
      store.clear();
      return initialState;
    }
    case 'setState': {
      return saveToStorage({ ...state, storyName: action.name, stories: action.stories, goals: action.goals, additional: action.additional });
    }
    case 'setGoals': {
      return saveToStorage({ ...state, goals: action.goals });
    }
    case 'setAdditional': {
      return saveToStorage({ ...state, additional: action.additional });
    }
    case 'setStoryName': {
      if (action.storyName.trim() === '') {
        return saveToStorage({ ...state, storyName: defaultStoryName });
      }
      return saveToStorage({ ...state, storyName: action.storyName });
    }
    case 'setStories': {
      return saveToStorage({ ...state, stories: action.stories });
    }
    case 'addStory': { // OK
      return saveToStorage({
        ...state,
        stories: [...state.stories, getEmptyStory()] 
      });
    }
    case 'deleteStory': { // OK
      const deletedSet = new Set(action.deleted);
      const nextStories = state.stories.filter(row => !deletedSet.has(row.id));

      return saveToStorage({
        ...state,
        stories: nextStories,
      });
    }
    case 'changeStory': { // OK
      const nextStories = state.stories.map(row => (action.changed[row.id] ? { ...row, ...action.changed[row.id] } : row));
      return saveToStorage({
        ...state, stories: nextStories,
      });
    }
    case 'addTest': { //OK
      const nextStories = state.stories.reduce((acc, story) => {
        if (action.storyId === story.id) {
          story.tests.push(getEmptyTest(action.text));
        }
        acc.push(story);
        return acc;
      }, []);

      return saveToStorage({
        ...state, stories: nextStories,
      });
    }
    case 'deleteTest': { // OK
      const nextStories = state.stories.map((story) => {
        if (story.id === action.storyId) {
          story.tests = story.tests.filter(test => test.id !== action.testId);
        } return story;
      });

      return saveToStorage({
        ...state, stories: nextStories,
      });
    }
    case 'setTest': {
      const nextStories = state.stories.map((story) => {
        if (story.id === action.storyId) {
          story.tests = story.tests.map((test) => {
            if (test.id === action.testId) {
              test.text = action.value;
            } return test;
          });
        } return story;
      });

      return saveToStorage({
        ...state, stories: nextStories,
      });
    }
    case 'setDialog': {
      return { ...state, isDialogOpen: action.value };
    }
    default:
      return state;
  }
}