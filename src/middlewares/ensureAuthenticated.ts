import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { prismaClient } from './../database/index';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Invalid token', 401);
  }

  const [, token] = authHeader.split(' ');

  const jwtSecret = process.env.JWT_SECRET as string;

  try {
    const { sub: userId } = verify(token, jwtSecret);

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch (e) {
    throw new AppError('Invalid token', 401);
  }
}
