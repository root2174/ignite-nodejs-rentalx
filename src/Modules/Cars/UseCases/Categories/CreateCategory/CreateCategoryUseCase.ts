import { CategoryDTO } from '../../../DTO/CategoryDTO';
import { ICategoryForm } from '../../../Forms/ICategoryForm';
import { Category } from '../../../Models/Category';
import { ICategoriesRepository } from '../../../Repositories/ICategoriesRepository';

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: ICategoryForm): CategoryDTO {
    const category = new Category.Builder()
      .setName(name)
      .setDescription(description)
      .setCreatedAt(new Date())
      .build();

    const categoryExists = this.categoriesRepository.findByName(category.name);

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create(category);
    return CategoryDTO.fromCategory(category);
  }
}

export { CreateCategoryUseCase };
