import { Category } from '../Models/Category';
import { ICategoriesRepository } from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  constructor() {
    this.categories = [];
  }

  create(category: Category): Category {
    this.categories.push(category);
    return category;
  }

  findAll(): Category[] {
    return this.categories;
  }

  findByName(name: string) {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
