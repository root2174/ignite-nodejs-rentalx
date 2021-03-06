import { AppError } from '@errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import prisma from '../../../../database';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };

  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Email or password invalid');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password invalid');
    }

    const jwtSecret = process.env.JWT_SECRET as string;

    const token = sign({ id: user.id }, jwtSecret, {
      expiresIn: '30d',
      algorithm: 'HS256',
      subject: user.id,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
