const vowels = ['a', 'e', 'i', 'o', 'y'];
const isVowel = (char = '') => vowels.indexOf(char.toLowerCase()) !== -1;

export const convertToStory = story =>
  `As ${isVowel(story.role[0]) ? 'an' : 'a'} ${story.role.trim()}, I want to be able to ${story.action.trim()} so that I can ${story.purpose.trim()}.`;