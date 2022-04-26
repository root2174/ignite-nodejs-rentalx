import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CategoryDTO } from '../../../DTO/CategoryDTO';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
      const categories = await listCategoriesUseCase.execute();
      const categoriesDTO = categories.map(category =>
        CategoryDTO.fromCategory(category),
      );

      return response.json(categoriesDTO);
    } catch (e) {
      console.log(e);
    }
  }
}

export { ListCategoriesController };
