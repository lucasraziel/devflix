import { describe, it } from 'node:test';
import assert from 'node:assert';
import VideoAdapted, { ResolutionType } from './video-adapted.js';
import { FileInfo, Resolution } from '@devflix/shared';
import AudioLanguage from '../value-objects/audio-language.js';
import SubtitleLanguage from '../value-objects/subtitle-language.js';
import Snapshot from '../value-objects/snapshot.js';

describe('VideoAdapted', () => {
  it('should create a new video adapted', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video'
    );
    const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
    const video = VideoAdapted.create({
      fileInfo,
      originalAudio: audioLanguage,
      durationInSeconds: 25,
    });
    assert.strictEqual(
      video.durationInSeconds,
      25,
      'should be the same video duration'
    );
    assert(
      video.fileInfo.equals(fileInfo),
      'should be the same video file info'
    );
    assert(
      video.originalAudio.equals(audioLanguage),
      'should be the same video original audio'
    );
    assert(
      video.audioLanguages.length === 0,
      'should be the same video audio languages'
    );
    assert(video.subtitles.length === 0, 'should be the same video subtitles');
    assert(
      video.resolutions.size === 0,
      'should be the same video resolutions'
    );
    assert(video.snapshots.size === 0, 'should be the same video snapshots');
  });

  it('should alter the video duration', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video'
    );
    const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
    const video = VideoAdapted.create({
      fileInfo,
      originalAudio: audioLanguage,
      durationInSeconds: 25,
    });
    video.durationInSeconds = 30;
    assert.strictEqual(
      video.durationInSeconds,
      30,
      'should be the same video duration'
    );
  });
  it('should alter the video file info', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video'
    );
    const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
    const video = VideoAdapted.create({
      fileInfo,
      originalAudio: audioLanguage,
      durationInSeconds: 25,
    });
    const fileInfo2 = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video2'
    );
    video.fileInfo = fileInfo2;
    assert(
      video.fileInfo.equals(fileInfo2),
      'should be the same video file info'
    );
  });
  it('should alter the video original audio', () => {
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video'
    );
    const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
    const video = VideoAdapted.create({
      fileInfo,
      originalAudio: audioLanguage,
      durationInSeconds: 25,
    });
    const audioLanguage2 = new AudioLanguage('en', 5, '/path/to/audio2');
    video.originalAudio = audioLanguage2;
    assert(
      video.originalAudio.equals(audioLanguage2),
      'should be the same video original audio'
    );
  });

  describe('AudioLanguage', () => {
    it('should alter the video audio languages', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('en', 5, '/path/to/audio2');
      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.audioLanguages = [audioLanguage2];
      assert(
        video.audioLanguages.length === 1,
        'should be the same video audio languages'
      );
      assert(
        video.audioLanguages[0].equals(audioLanguage2),
        'should be the same video audio languages'
      );
    });

    it('should remove all audio languages', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('en', 5, '/path/to/audio2');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.audioLanguages = [audioLanguage, audioLanguage2];
      video.audioLanguages = [];
      assert(
        video.audioLanguages.length === 0,
        'should be the same video audio languages'
      );
    });

    it('should remove a audio language', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('en', 5, '/path/to/audio2');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.audioLanguages = [audioLanguage, audioLanguage2];
      video.removeAudioLanguage(audioLanguage);
      assert(
        video.audioLanguages.length === 1,
        'should be the same video audio languages'
      );
      assert(
        video.audioLanguages[0].equals(audioLanguage2),
        'should be the same video audio languages'
      );
    });

    it('should add a audio language', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const audioLanguage2 = new AudioLanguage('en', 5, '/path/to/audio2');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.audioLanguages = [audioLanguage];
      video.addAudioLanguage(audioLanguage2);
      assert(
        video.audioLanguages.length === 2,
        'should be the same video audio languages'
      );
      assert(
        video.audioLanguages[0].equals(audioLanguage),
        'should be the same video audio languages'
      );
      assert(
        video.audioLanguages[1].equals(audioLanguage2),
        'should be the same video audio languages'
      );
    });
  });

  describe('Subtitles', () => {
    it('should alter the video subtitles', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );
      const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.subtitles = [subtitleLanguage];
      assert(
        video.subtitles.length === 1,
        'should be the same video subtitles'
      );
      assert(
        video.subtitles[0].equals(subtitleLanguage),
        'should be the same video subtitles'
      );
    });

    it('should remove all subtitles', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
      const subtitleLanguage2 = new SubtitleLanguage(
        'en',
        '/path/to/subtitle2'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.subtitles = [subtitleLanguage, subtitleLanguage2];
      video.subtitles = [];
      assert(
        video.subtitles.length === 0,
        'should be the same video subtitles'
      );
    });

    it('should remove a subtitle language', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );
      const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
      const subtitleLanguage2 = new SubtitleLanguage(
        'en',
        '/path/to/subtitle2'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });

      video.subtitles = [subtitleLanguage, subtitleLanguage2];
      video.removeSubtitle(subtitleLanguage);
      assert(
        video.subtitles.length === 1,
        'should be the same video subtitles'
      );
      assert(
        video.subtitles[0].equals(subtitleLanguage2),
        'should be the same video subtitles'
      );
    });

    it('should add a subtitle language', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );
      const subtitleLanguage = new SubtitleLanguage('en', '/path/to/subtitle');
      const subtitleLanguage2 = new SubtitleLanguage(
        'en',
        '/path/to/subtitle2'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });

      video.subtitles = [subtitleLanguage];
      video.addSubtitle(subtitleLanguage2);
      assert(
        video.subtitles.length === 2,
        'should be the same video subtitles'
      );
      assert(
        video.subtitles[0].equals(subtitleLanguage),
        'should be the same video subtitles'
      );
      assert(
        video.subtitles[1].equals(subtitleLanguage2),
        'should be the same video subtitles'
      );
    });
  });

  describe('Resolutions', () => {
    it('should add a new large video resolution', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      const resolution = new Resolution(3840, 2160);
      video.resolutions.set(ResolutionType.LARGE, resolution);
      assert(
        video.resolutions.size === 1,
        'should be the same video resolutions'
      );
      assert(
        video.resolutions.get(ResolutionType.LARGE)?.equals(resolution),
        'should be the same video resolutions'
      );
    });

    it('should add a new medium video resolution', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      const resolution = new Resolution(1920, 1080);
      video.resolutions.set(ResolutionType.MEDIUM, resolution);
      assert(
        video.resolutions.size === 1,
        'should be the same video resolutions'
      );
      assert(
        video.resolutions.get(ResolutionType.MEDIUM)?.equals(resolution),
        'should be the same video resolutions'
      );
    });

    it('should add a new small video resolution', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      const resolution = new Resolution(1280, 720);
      video.resolutions.set(ResolutionType.SMALL, resolution);
      assert(
        video.resolutions.size === 1,
        'should be the same video resolutions'
      );
      assert(
        video.resolutions.get(ResolutionType.SMALL)?.equals(resolution),
        'should be the same video resolutions'
      );
    });

    it('should remove all resolutions', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const resolution = new Resolution(3840, 2160);
      const resolution2 = new Resolution(1920, 1080);

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.resolutions.set(ResolutionType.LARGE, resolution);
      video.resolutions.set(ResolutionType.MEDIUM, resolution2);
      video.resolutions.clear();
      assert(
        video.resolutions.size === 0,
        'should be the same video resolutions'
      );
    });

    it('should remove a large resolution', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const resolution = new Resolution(3840, 2160);
      const resolution2 = new Resolution(1920, 1080);

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.resolutions.set(ResolutionType.LARGE, resolution);
      video.resolutions.set(ResolutionType.MEDIUM, resolution2);
      video.resolutions.delete(ResolutionType.LARGE);
      assert(
        video.resolutions.size === 1,
        'should be the same video resolutions'
      );
      assert(
        video.resolutions.get(ResolutionType.MEDIUM)?.equals(resolution2),
        'should be the same video resolutions'
      );
    });

    it('should remove a medium resolution', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const resolution = new Resolution(3840, 2160);
      const resolution2 = new Resolution(1920, 1080);

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.resolutions.set(ResolutionType.LARGE, resolution);
      video.resolutions.set(ResolutionType.MEDIUM, resolution2);
      video.resolutions.delete(ResolutionType.MEDIUM);
      assert(
        video.resolutions.size === 1,
        'should be the same video resolutions'
      );
      assert(
        video.resolutions.get(ResolutionType.LARGE)?.equals(resolution),
        'should be the same video resolutions'
      );
    });

    it('should remove a small resolution', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const resolution = new Resolution(3840, 2160);
      const resolution2 = new Resolution(1920, 1080);

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.resolutions.set(ResolutionType.LARGE, resolution);
      video.resolutions.set(ResolutionType.MEDIUM, resolution2);
      video.resolutions.delete(ResolutionType.SMALL);
      assert(
        video.resolutions.size === 2,
        'should be the same video resolutions'
      );
      assert(
        video.resolutions.get(ResolutionType.LARGE)?.equals(resolution),
        'should be the same video resolutions'
      );
      assert(
        video.resolutions.get(ResolutionType.MEDIUM)?.equals(resolution2),
        'should be the same video resolutions'
      );
    });
  });

  describe('Snapshots', () => {
    it('should add a new snapshot', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );
      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });

      const snapshot = new Snapshot('/path/to/snapshot', 10);
      video.addSnapshot(snapshot);
      assert(video.snapshots.size === 1, 'should be the same video snapshots');
      assert(
        video.snapshots.get(snapshot.duration)?.equals(snapshot),
        'should be the same video snapshots'
      );
    });

    it('should alter a snapshot', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const snapshot = new Snapshot('/path/to/snapshot', 10);
      const snapshot2 = new Snapshot('/path/to/snapshot2', 15);

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.snapshots.set(1, snapshot);
      video.snapshots.set(1, snapshot2);
      assert(video.snapshots.size === 1, 'should be the same video snapshots');
      assert(
        video.snapshots.get(1)?.equals(snapshot2),
        'should be the same video snapshots'
      );
    });

    it('should remove a snapshot', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const snapshot = new Snapshot('/path/to/snapshot', 10);

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.addSnapshot(snapshot);
      video.removeSnapshot(snapshot);
      assert(video.snapshots.size === 0, 'should be the same video snapshots');
    });

    it('should remove all snapshots', () => {
      const fileInfo = new FileInfo(
        'video.mp4',
        100000,
        'video/mp4',
        'mp4',
        '/path/to/video'
      );

      const audioLanguage = new AudioLanguage('en', 5, '/path/to/audio');
      const snapshot = new Snapshot('/path/to/snapshot', 10);

      const video = VideoAdapted.create({
        fileInfo,
        originalAudio: audioLanguage,
        durationInSeconds: 25,
      });
      video.snapshots.set(1, snapshot);
      video.snapshots.clear();
      assert(video.snapshots.size === 0, 'should be the same video snapshots');
    });
  });
});
