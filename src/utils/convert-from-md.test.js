import { convertFromMD } from './convert-from-md';

describe('#convertFromMD', () => {
  describe('Name', () => {
    it('should recognize the name of the file', () => {
      const test = `## File Name`;
  
      expect(convertFromMD(test).name).toBe('File Name');
    });
  
    it('should recognize the name without space', () => {
      const test = `##File Name`;
  
      expect(convertFromMD(test).name).toBe('File Name');
    });

    it('should work with multiline', () => {
      const test = `
        start

        ##File Name
      
        end
      `;

      expect(convertFromMD(test).name).toBe('File Name');
    });

    it('should save name only once', () => {
      const test = `## File Name\n#### Goals`;

      expect(convertFromMD(test).name).toBe('File Name');
    });
  });

  describe('Goals', () => {
    it('should recognize', () => {
      const test = '#### Goals\nOur goals here...';

      expect(convertFromMD(test).goals).toBe('Our goals here...');
    });

    it('should recognize multiline goals', () => {
      const test = '#### Goals\nOur goals here...\n\nAnd here...';

      expect(convertFromMD(test).goals).toBe('Our goals here...\nAnd here...');
    });
  })
  
  describe('Additional', () => {
    it('should recognize', () => {
      const test = '#### Additional\nOur additional here...';

      expect(convertFromMD(test).additional).toBe('Our additional here...');
    });

    it('should recognize multiline additional', () => {
      const test = '#### Additional\nOur additional here...\n\nAnd here...\n### Goals';

      expect(convertFromMD(test).additional).toBe('Our additional here...\nAnd here...');
    });
  })

  describe('User Stories', () => {
    it('should recognize without tests', () => {
      const test = '#### User Stories\n\n1. As a user, I want to be able to see a list of all available product previews, so that I can make a good choice for me.';

      expect(convertFromMD(test).stories).toEqual([{
        id: expect.any(String),
        role: 'user',
        action: 'see a list of all available product previews',
        purpose: 'make a good choice for me',
        tests: [],
      }]);
    });
    
    it('should recognize more then one row without tests', () => {
      const test = '#### User Stories\n\n1. As a user, I want to be able to see a list of all available product previews, so that I can make a good choice for me.\n2. As a user, I want to be able to open one of the products page, so that I can get to know about its details.';

      expect(convertFromMD(test).stories).toEqual([{
        id: expect.any(String),
        role: 'user',
        action: 'see a list of all available product previews',
        purpose: 'make a good choice for me',
        tests: [],
      }, {
        id: expect.any(String),
        role: 'user',
        action: 'open one of the products page',
        purpose: 'get to know about its details',
        tests: [],
      }]);
    });

    it('should recognize with test', () => {
      const test = '#### User Stories\n\n1. As a user, I want to be able to see a list of all available product previews, so that I can make a good choice for me.\n#### Acceptance Criteria & Tests\n| ID | Criteria | Test |\n| -- | :------- | :--- |\n| 1 | Capability to see a list of all available product previews. | 1. Navigate to the `gallery` page. |';

      expect(convertFromMD(test).stories).toEqual([{
        id: expect.any(String),
        role: 'user',
        action: 'see a list of all available product previews',
        purpose: 'make a good choice for me',
        tests: [{
          id: expect.any(String),
          text: 'Navigate to the `gallery` page'
        }],
      }]);
    });
    
    it('should recognize with two tests', () => {
      const test = '#### User Stories\n\n1. As a user, I want to be able to see a list of all available product previews, so that I can make a good choice for me.\n#### Acceptance Criteria & Tests\n| ID | Criteria | Test |\n| -- | :------- | :--- |\n| 1 | Capability to see a list of all available product previews. | 1. Navigate to the `gallery` page. 2. One More test. |';

      expect(convertFromMD(test).stories).toEqual([{
        id: expect.any(String),
        role: 'user',
        action: 'see a list of all available product previews',
        purpose: 'make a good choice for me',
        tests: [{
          id: expect.any(String),
          text: 'Navigate to the `gallery` page'
        }, {
          id: expect.any(String),
          text: 'One More test',
        }],
      }]);
    });

    it('should recognize with two stories and two tests', () => {
      const test = '#### User Stories\n\n1. As a user1, I want to be able to see1, so that I can make1.\n2. As a user2, I want to be able to see2, so that I can make2.\n#### Acceptance Criteria & Tests\n| ID | Criteria | Test |\n| -- | :------- | :--- |\n| 1 | Capability to see1. | 1. Navigate1. 2. Open1. |\n| 2 | Capability to see2. | 1. Navigate2. 2. Open2. |';

      expect(convertFromMD(test).stories).toEqual([{
        id: expect.any(String),
        role: 'user1',
        action: 'see1',
        purpose: 'make1',
        tests: [{
          id: expect.any(String),
          text: 'Navigate1'
        }, {
          id: expect.any(String),
          text: 'Open1',
        }],
      }, {
        id: expect.any(String),
        role: 'user2',
        action: 'see2',
        purpose: 'make2',
        tests: [{
          id: expect.any(String),
          text: 'Navigate2'
        }, {
          id: expect.any(String),
          text: 'Open2',
        }],
      }]);
    });

    it('should recognize story image', () => {
      const test = '#### User Stories\n\n1. As a user, I want to be able to see a list of all available product previews, so that I can make a good choice for me.\n![](https://user-story-creator.s3.eu-central-1.amazonaws.com/test/Support_3.png)';

      expect(convertFromMD(test).stories).toEqual([{
        id: expect.any(String),
        role: 'user',
        action: 'see a list of all available product previews',
        purpose: 'make a good choice for me',
        imgUrl: 'https://user-story-creator.s3.eu-central-1.amazonaws.com/test/Support_3.png',
        tests: [],
      }]);
    });
  });
});