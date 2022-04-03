import { Category } from '../Models/Category';

interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  create(category: Category): Category;
  findAll(): Category[];
}

export { ICategoriesRepository };
