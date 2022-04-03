import { Router } from 'express';

import { createCategoryController } from '../Modules/Cars/UseCases/Categories/CreateCategory';
import { listCategoriesController } from '../Modules/Cars/UseCases/Categories/ListCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) =>
  createCategoryController.handle(req, res),
);

categoriesRoutes.get('/', (req, res) =>
  listCategoriesController.handle(req, res),
);

export { categoriesRoutes };
