import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (!file) {
      return response.status(400).json({
        message: 'File not found',
      });
    }

    try {
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
      await importCategoryUseCase.execute(file);
      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err || 'Unexpected error',
      });
    }
  }
}

export { ImportCategoryController };
