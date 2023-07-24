/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Entity, type FileInfo, type Resolution } from '@devflix/shared';
import type AudioLanguage from '../value-objects/audio-language.js';
import type SubtitleLanguage from '../value-objects/subtitle-language.js';
import type Snapshot from '../value-objects/snapshot.js';

export enum ResolutionType {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface VideoAdaptedModel extends Record<string, unknown> {
  durationInSeconds: number;
  fileInfo: FileInfo;
  resolutions: Map<ResolutionType, Resolution>;
  originalAudio: AudioLanguage;
  subtitles: SubtitleLanguage[];
  audioLanguages: AudioLanguage[];
  snapshots: Map<number, Snapshot>;
}

interface VideoAdapterModelCreation extends Record<string, unknown> {
  durationInSeconds: number;
  fileInfo: FileInfo;
  originalAudio: AudioLanguage;
}

export default class VideoAdapted extends Entity<VideoAdaptedModel> {
  public static create(data: VideoAdapterModelCreation): VideoAdapted {
    const resolutions = new Map<ResolutionType, Resolution>();
    const subtitles: SubtitleLanguage[] = [];
    const audioLanguages: AudioLanguage[] = [];
    const snapshots = new Map<number, Snapshot>();
    return new VideoAdapted({
      ...data,
      resolutions,
      subtitles,
      audioLanguages,
      snapshots,
    });
  }

  public set durationInSeconds(duration: number) {
    this._dataModel.durationInSeconds = duration;
  }

  public get durationInSeconds(): number {
    return this._dataModel.durationInSeconds;
  }

  public set fileInfo(fileInfo: FileInfo) {
    this._dataModel.fileInfo = fileInfo;
  }

  public get fileInfo(): FileInfo {
    return this._dataModel.fileInfo;
  }

  public get resolutions(): Map<ResolutionType, Resolution> {
    return this._dataModel.resolutions;
  }

  public get smallResolution(): Resolution {
    return this._dataModel.resolutions.get(ResolutionType.SMALL) as Resolution;
  }

  public get mediumResolution(): Resolution {
    return this._dataModel.resolutions.get(ResolutionType.MEDIUM) as Resolution;
  }

  public get largeResolution(): Resolution {
    return this._dataModel.resolutions.get(ResolutionType.LARGE) as Resolution;
  }

  public get originalAudio(): AudioLanguage {
    return this._dataModel.originalAudio;
  }

  public set originalAudio(originalAudio: AudioLanguage) {
    this._dataModel.originalAudio = originalAudio;
  }

  public set subtitles(subtitles: SubtitleLanguage[]) {
    this._dataModel.subtitles = subtitles;
  }

  public get subtitles(): SubtitleLanguage[] {
    return this._dataModel.subtitles;
  }

  public set audioLanguages(audioLanguages: AudioLanguage[]) {
    this._dataModel.audioLanguages = audioLanguages;
  }

  public get audioLanguages(): AudioLanguage[] {
    return this._dataModel.audioLanguages;
  }

  public addSubtitle(subtitle: SubtitleLanguage): void {
    this._dataModel.subtitles.push(subtitle);
  }

  public removeSubtitle(subtitle: SubtitleLanguage): void {
    this._dataModel.subtitles = this._dataModel.subtitles.filter(
      (s) => !s.equals(subtitle)
    );
  }

  public addAudioLanguage(audioLanguage: AudioLanguage): void {
    this._dataModel.audioLanguages.push(audioLanguage);
  }

  public removeAudioLanguage(audioLanguage: AudioLanguage): void {
    this._dataModel.audioLanguages = this._dataModel.audioLanguages.filter(
      (a) => !a.equals(audioLanguage)
    );
  }

  public addSnapshot(snapshot: Snapshot): void {
    this._dataModel.snapshots.set(snapshot.duration, snapshot);
  }

  public removeSnapshot(snapshot: Snapshot): void {
    this._dataModel.snapshots.delete(snapshot.duration);
  }

  public get snapshots(): Map<number, Snapshot> {
    return this._dataModel.snapshots;
  }
}
