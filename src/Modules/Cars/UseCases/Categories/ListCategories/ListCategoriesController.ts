import { Request, Response } from 'express';
import { CategoryDTO } from '../../../DTO/CategoryDTO';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoriesUseCase
      .execute()
      .map(category => CategoryDTO.fromCategory(category));

    return response.json(categories);
  }
}

export { ListCategoriesController };
