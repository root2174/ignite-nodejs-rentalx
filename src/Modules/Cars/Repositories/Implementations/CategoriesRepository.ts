import { Category } from '../../Models/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  public create(category: Category): Category {
    this.categories.push(category);
    return category;
  }

  public findAll(): Category[] {
    return this.categories;
  }

  public findByName(name: string) {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
