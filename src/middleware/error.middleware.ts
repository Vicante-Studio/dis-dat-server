import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/serverError.js'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    })
    return
  }

  // unexpected error: log the full stack, but don't send internals to the client
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
}