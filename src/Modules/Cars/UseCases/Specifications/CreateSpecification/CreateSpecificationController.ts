import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase,
    );

    try {
      await createSpecificationUseCase.create({ name, description });
      return response.status(201).send();
    } catch (e) {
      if (e instanceof Error) {
        return response.status(400).json({
          message: e.message || 'Unexpected error',
        });
      }
    }
  }
}

export { CreateSpecificationController };
