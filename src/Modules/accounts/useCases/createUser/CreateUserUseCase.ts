import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { injectable } from 'tsyringe';
import prisma from '../../../../database';

type CreateUserForm = Omit<User, 'id' | 'admin' | 'createdAt'>;

@injectable()
export class CreateUserUseCase {
  async execute({ name, email, password, driver_license }: CreateUserForm) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    return await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
        driver_license,
      },
    });
  }
}
