import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const listCategoriesUseCase = new ListCategoriesUseCase();

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
);

export { listCategoriesController };
