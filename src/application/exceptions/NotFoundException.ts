export class NotFoundException extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundException';
    this.statusCode = 404;
  }
}
