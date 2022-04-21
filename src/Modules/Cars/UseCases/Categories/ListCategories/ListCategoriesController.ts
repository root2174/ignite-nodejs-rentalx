import { Request, Response } from 'express';
import { CategoryDTO } from '../../../DTO/CategoryDTO';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoriesUseCase.execute();
    const categoriesDTO = categories.map(category => {
      return CategoryDTO.fromCategory(category);
    });

    return response.json(categoriesDTO);
  }
}

export { ListCategoriesController };
