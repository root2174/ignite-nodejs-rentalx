import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import 'reflect-metadata';
import { prismaMock } from '../../../../database/prismaClientMock';
import { AppError } from '../../../../errors/AppError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Authenticate User', () => {
  it('Authenticates a user without errors', () => {
    const user = {
      id: '123',
      createdAt: new Date(),
      name: 'Mocked User',
      email: 'john@doe.com',
      password: '123456',
      admin: false,
      avatar: 'avatar',
      driver_license: '123',
    };

    const returnedUser = {
      name: 'Mocked User',
      email: 'john@doe.com',
    };

    // @ts-ignore
    prismaMock.user.findUnique.mockResolvedValue(user);
    // @ts-ignore
    compare.mockResolvedValue(true);
    // @ts-ignore
    sign.mockReturnValue('signed');

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      }),
    ).resolves.toEqual({
      user: returnedUser,
      token: 'signed',
    });
  });

  it('Throws an error when the user does not exist', () => {
    const user = {
      id: '123',
      createdAt: new Date(),
      name: 'Mocked User',
      email: 'john@doe.com',
      password: '123456',
      admin: false,
      avatar: 'avatar',
      driver_license: '123',
    };

    // @ts-ignore
    prismaMock.user.findUnique.mockResolvedValue(undefined);
    const authenticateUserUseCase = new AuthenticateUserUseCase();

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Throws an error when the passwords do not match', () => {
    const user = {
      id: '123',
      createdAt: new Date(),
      name: 'Mocked User',
      email: 'john@doe.com',
      password: '123456',
      admin: false,
      avatar: 'avatar',
      driver_license: '123',
    };

    // @ts-ignore
    prismaMock.user.findUnique.mockResolvedValue(user);
    // @ts-ignore
    compare.mockResolvedValue(false);
    const authenticateUserUseCase = new AuthenticateUserUseCase();

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
