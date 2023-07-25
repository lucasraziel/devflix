import ffmpeg from 'fluent-ffmpeg';
import FFMPEGError from '../errors/ffmpeg-error.js';

export default class FFProbe {
  constructor(private readonly fileOrigin: string) {}

  public getResolution = async (): Promise<{
    width: number;
    height: number;
  }> => {
    return await new Promise((resolve, reject) => {
      ffmpeg(this.fileOrigin)
        .input(this.fileOrigin)
        .ffprobe((error, metadata) => {
          if (error) {
            console.log(error);
            reject(new FFMPEGError((error as Error).message, { cause: error }));
            return;
          }
          const { width, height } = metadata.streams[0];
          if (typeof width !== 'number' || typeof height !== 'number') {
            reject(new FFMPEGError('Invalid resolution'));
            return;
          }
          resolve({ width, height });
        });
    });
  };

  public getDurationInSeconds = async (): Promise<number> => {
    return await new Promise((resolve, reject) => {
      ffmpeg(this.fileOrigin)
        .input(this.fileOrigin)
        .ffprobe((error, metadata) => {
          if (error) {
            console.log(error);
            reject(new FFMPEGError((error as Error).message, { cause: error }));
            return;
          }
          const { duration } = metadata.format;
          if (typeof duration !== 'number') {
            reject(new FFMPEGError('Invalid duration'));
            return;
          }
          resolve(duration);
        });
    });
  };

  public getDurationInMilisseconds = async (): Promise<number> => {
    return await new Promise((resolve, reject) => {
      ffmpeg(this.fileOrigin)
        .input(this.fileOrigin)
        .ffprobe((error, metadata) => {
          if (error) {
            console.log(error);
            reject(new FFMPEGError((error as Error).message, { cause: error }));
            return;
          }
          const { duration } = metadata.format;
          if (typeof duration !== 'number') {
            reject(new FFMPEGError('Invalid duration'));
            return;
          }
          resolve(duration * 100);
        });
    });
  };

  public resize = async (output: string, size: string): Promise<void> => {
    await new Promise((resolve, reject) => {
      ffmpeg(this.fileOrigin)
        .output(output)
        .size(size)
        .on('end', resolve)
        .on('error', (error) => {
          console.log(error);
          reject(new FFMPEGError((error as Error).message, { cause: error }));
        })
        .run();
    });
  };

  public generateSnapshots = async (
    count: number,
    filename: string,
    folder: string
  ): Promise<void> => {
    await new Promise((resolve, reject) => {
      ffmpeg(this.fileOrigin)
        .on('end', resolve)
        .on('error', (error) => {
          console.log(error);
          reject(new FFMPEGError((error as Error).message, { cause: error }));
        })
        .screenshots({
          count,
          filename,
          folder,
          size: '50%',
        });
    });
  };
}
