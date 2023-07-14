import { describe, it } from 'node:test';
import assert from 'node:assert';

import AudioLanguage from './audio-language.js';

describe('AudioLanguage', () => {
  it('should create a new audio language', () => {
    const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
    assert.strictEqual(
      audioLanguage.language,
      'en',
      'should be the same audio language'
    );
    assert.strictEqual(
      audioLanguage.channels,
      5,
      'should be the same audio channels'
    );
    assert.strictEqual(
      audioLanguage.path,
      '/path/to/audio',
      'should be the same audio path'
    );
  });
  describe('equals', () => {
    it('should compare equally audio languages with same values', () => {
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('en', 5, '/path/to/audio');
      assert(audioLanguage.equals(audioLanguage2), 'should be equal');
    });

    it('should compare different audio languages with different values', () => {
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('es', 2, '/path/to/audio2');
      assert(!audioLanguage.equals(audioLanguage2), 'should not be equal');
    });
    it('should compare different audio languages with different languages', () => {
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('es', 5, '/path/to/audio');
      assert(!audioLanguage.equals(audioLanguage2), 'should not be equal');
    });
    it('should compare different audio languages with different channels', () => {
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('en', 2, '/path/to/audio');
      assert(!audioLanguage.equals(audioLanguage2), 'should not be equal');
    });
    it('should compare different audio languages with different paths', () => {
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('en', 5, '/path/to/audio2');
      assert(!audioLanguage.equals(audioLanguage2), 'should not be equal');
    });
  });
});
