import { promisify } from 'util';
import { exec as execCb } from 'child_process';

const exec = promisify(execCb);

const ffprobe = async (
  ffmpegArguments: string[]
): Promise<{ stdout: string; stderr: string }> =>
  await exec(`ffprobe ${ffmpegArguments.join(' ')}`);

const getResolution = async (
  fileOrigin: string
): Promise<{ width: number; height: number }> => {
  const { stdout: resolution } = await ffprobe([
    ' -v error -select_streams v -show_entries stream=width,height -of csv=p=0:s=x',
    fileOrigin,
  ]);
  const [width, height] = resolution.split('x');
  return { width: Number(width), height: Number(height) };
};

const getDuration = async (fileOrigin: string): Promise<number> => {
  const { stdout: duration } = await ffprobe([
    ' -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1',
    fileOrigin,
  ]);
  return Math.floor(Number(duration));
};
ffprobe.getResolution = getResolution;
ffprobe.getDuration = getDuration;

export default ffprobe;
