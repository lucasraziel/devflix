import { promisify } from "util";
import { exec as execCb } from "child_process";

const exec = promisify(execCb);

const ffprobe = async (ffmpegArguments: string[]):Promise<{stdout: string; stderr: string}> => await exec(`ffprobe ${ffmpegArguments.join(" ")}`);

const getResolution = async (fileOrigin: string): Promise<{width: number; height: number}> => {
    const {stdout: resolution} = await ffprobe([' -v error -select_streams v -show_entries stream=width,height -of csv=p=0:s=x', fileOrigin]);
    const [width, height] = resolution.split('x');
    return {width: Number(width), height: Number(height)};
};

ffprobe.getResolution = getResolution;

export default ffprobe;