import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSpecificationUseCase } from './ListSpecificationsUseCase';

class ListSpecificationController {
  async handle(request: Request, response: Response) {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationUseCase,
    );

    try {
      const specifications = await listSpecificationsUseCase.listAll();
      return response.status(200).json(specifications);
    } catch (e) {
      if (e instanceof Error) {
        return response.status(400).json({
          message: e.message || 'Unexpected error',
        });
      }
    }
  }
}

export { ListSpecificationController };
