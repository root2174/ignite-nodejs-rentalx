import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(
    private readonly createSpecificationUseCase: CreateSpecificationUseCase,
  ) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    this.createSpecificationUseCase.create({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
