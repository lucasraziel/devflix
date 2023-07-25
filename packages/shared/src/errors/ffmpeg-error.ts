import DevFlixError from './devflix-error.js';

export default class FFMPEGError extends DevFlixError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
  }
}
