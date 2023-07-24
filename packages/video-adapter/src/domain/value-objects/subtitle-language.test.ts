import { describe, it } from 'node:test';
import assert from 'node:assert';
import SubtitleLanguage from './subtitle-language.js';

describe('SubtitleLanguage', () => {
  it('should create a new subtitle language', () => {
    const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
    assert.strictEqual(
      subtitleLanguage.language,
      'en',
      'should be the same subtitle language'
    );
    assert.strictEqual(
      subtitleLanguage.path,
      '/path/to/subtitle',
      'should be the same subtitle path'
    );
  });
  describe('equals', () => {
    it('should compare equally subtitle languages with same values', () => {
      const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
      const subtitleLanguage2 = new SubtitleLanguage('en', '/path/to/subtitle');
      assert(subtitleLanguage.equals(subtitleLanguage2), 'should be equal');
    });
    it('should compare different subtitle languages with different values', () => {
      const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
      const subtitleLanguage2 = new SubtitleLanguage(
        'es',
        '/path/to/subtitle2'
      );
      assert(
        !subtitleLanguage.equals(subtitleLanguage2),
        'should not be equal'
      );
    });
    it('should compare different subtitle languages with different languages', () => {
      const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
      const subtitleLanguage2 = new SubtitleLanguage('es', '/path/to/subtitle');
      assert(
        !subtitleLanguage.equals(subtitleLanguage2),
        'should not be equal'
      );
    });
    it('should compare different subtitle languages with different paths', () => {
      const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
      const subtitleLanguage2 = new SubtitleLanguage(
        'en',
        '/path/to/subtitle2'
      );
      assert(
        !subtitleLanguage.equals(subtitleLanguage2),
        'should not be equal'
      );
    });
  });
});
