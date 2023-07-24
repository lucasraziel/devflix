import { describe, it } from 'node:test';
import assert from 'node:assert';
import FileInfo from './file-info.js';

describe('FileInfo', () => {
  it('should create a new file info', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    assert.strictEqual(fileInfo.name, 'video.mp4', 'should have the same name');
    assert.strictEqual(fileInfo.size, 100000, 'should have the same size');
    assert.strictEqual(
      fileInfo.mimeType,
      'video/mp4',
      'should have the same mime type'
    );
    assert.strictEqual(
      fileInfo.extension,
      'mp4',
      'should have the same extension'
    );
    assert.strictEqual(fileInfo.path, 'path', 'should have the same path');
  });
  it('should compare equally file infos with same name, size, mime type, extension and path', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    const fileInfo2 = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    assert(fileInfo.equals(fileInfo2), 'should be equal');
  });
  it('should compare different file infos with different name, size, mime type, extension and path', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    const fileInfo2 = new FileInfo(
      'video2.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    assert(!fileInfo.equals(fileInfo2), 'should not be equal');
  });
  it('should compare different file infos with different name', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    const fileInfo2 = new FileInfo(
      'video2.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    assert(!fileInfo.equals(fileInfo2), 'should not be equal');
  });
  it('should compare different file infos with different size', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    const fileInfo2 = new FileInfo(
      'video.mp4',
      200000,
      'video/mp4',
      'mp4',
      'path'
    );
    assert(!fileInfo.equals(fileInfo2), 'should not be equal');
  });
  it('should compare different file infos with different mime type', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    const fileInfo2 = new FileInfo(
      'video.mp4',
      100000,
      'video/mp3',
      'mp4',
      'path'
    );
    assert(!fileInfo.equals(fileInfo2), 'should not be equal');
  });
  it('should compare different file infos with different extension', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    const fileInfo2 = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp3',
      'path'
    );
    assert(!fileInfo.equals(fileInfo2), 'should not be equal');
  });
  it('should compare different file infos with different path', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path'
    );
    const fileInfo2 = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      'path2'
    );
    assert(!fileInfo.equals(fileInfo2), 'should not be equal');
  });
});
