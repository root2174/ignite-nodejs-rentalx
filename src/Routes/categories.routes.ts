import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../Modules/Cars/UseCases/Categories/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '../Modules/Cars/UseCases/Categories/ImportCategory/ImportCategoryController';
import { ListCategoriesController } from '../Modules/Cars/UseCases/Categories/ListCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
