import { fileURLToPath } from 'url';
import {resolve, dirname} from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url));

const rootDir = resolve(currentDir, '..', '..', '..', '..');

export default  rootDir;