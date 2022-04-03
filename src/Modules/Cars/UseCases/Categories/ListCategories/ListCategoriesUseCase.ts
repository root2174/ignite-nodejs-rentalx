import { Category } from '../../../Models/Category';
import { ICategoriesRepository } from '../../../Repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.findAll();
  }
}

export { ListCategoriesUseCase };
