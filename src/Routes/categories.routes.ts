import { Router } from 'express';

import { CategoryDTO } from '../Modules/Cars/DTO/CategoryDTO';
import { CategoriesRepository } from '../Modules/Cars/Repositories/CategoriesRepository';
import { createCategoryController } from '../Modules/Cars/UseCases/Categories/CreateCategory';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
  const categories: CategoryDTO[] = categoriesRepository
    .findAll()
    .map(category => CategoryDTO.fromCategory(category));

  return response.json(categories);
});

export { categoriesRoutes };
