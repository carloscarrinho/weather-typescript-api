export class InternalError extends Error {
  constructor(
    public message: string,
    protected code: number = 500,
    protected description?: string
  ) {
    super(message);
    // with the following code, if an error occurs, this class will be ommited, showing information
    // from the error had occurred:
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
