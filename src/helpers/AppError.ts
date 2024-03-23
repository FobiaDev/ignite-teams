export class AppError {
  private _message: string

  get message() {
    return this._message
  }

  constructor(message: string) {
    this._message = message
  }
}