import { Request, Response, NextFunction } from 'express';
import { DomainException } from '../../../domain/exceptions/DomainException';
import { NotFoundException } from '../../../application/exceptions/NotFoundException';

export function translateExceptionMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof DomainException) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof NotFoundException) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}
