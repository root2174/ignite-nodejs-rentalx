import { Router } from 'express';
import multer from 'multer';
import { createCategoryController } from '../Modules/Cars/UseCases/Categories/CreateCategory';
import { importCategoryController } from '../Modules/Cars/UseCases/Categories/ImportCategory';
import { listCategoriesController } from '../Modules/Cars/UseCases/Categories/ListCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (req, res) =>
  createCategoryController.handle(req, res),
);

categoriesRoutes.get(
  '/',
  async (req, res) => await listCategoriesController.handle(req, res),
);

categoriesRoutes.post('/import', upload.single('file'), (req, res) =>
  importCategoryController.handle(req, res),
);

export { categoriesRoutes };
