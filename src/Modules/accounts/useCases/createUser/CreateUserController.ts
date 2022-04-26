import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserDTO } from '../../dto/UserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, driver_license } = request.body as User;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        driver_license,
      });

      return response.json(UserDTO.fromUser(user));
    } catch (e) {
      if (e instanceof Error) {
        return response.status(400).json({
          message: e.message || 'Unexpected error',
        });
      }
    }
  }
}
