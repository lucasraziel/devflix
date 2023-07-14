import { promisify } from 'util';
import { exec as execCb } from 'child_process';

const exec = promisify(execCb);

const ffmpeg = async (
  ffmpegArguments: string[]
): Promise<{ stdout: string; stderr: string }> =>
  await exec(`ffmpeg ${ffmpegArguments.join(' ')}`);

const divideBy2 = async (
  fileOrigin: string,
  fileDestin: string
): Promise<{ stdout: string; stderr: string }> =>
  await ffmpeg([
    '-i',
    fileOrigin,
    '-vf',
    '"scale=trunc(iw/4)*2:trunc(ih/4)*2"',
    '-c:a',
    'copy',
    fileDestin,
  ]);

const divideBy4 = async (
  fileOrigin: string,
  fileDestin: string
): Promise<{ stdout: string; stderr: string }> =>
  await ffmpeg([
    '-i',
    fileOrigin,
    '-vf',
    '"scale=trunc(iw/8)*2:trunc(ih/8)*2"',
    '-c:a',
    'copy',
    fileDestin,
  ]);

ffmpeg.divideBy2 = divideBy2;
ffmpeg.divideBy4 = divideBy4;

export default ffmpeg;
