import { CustomError } from 'ts-custom-error';

export default class NotAuthorizedError extends CustomError {
  constructor(public innerError?: Error | undefined) {
    super('Server cannot authorize request');
    this.name = 'NotAuthorizedError';
  }
}
