import { CategoryDTO } from '../../../DTO/CategoryDTO';
import { ICategoryForm } from '../../../Forms/ICategoryForm';
import { prismaClient } from './../../../../../database/index';

class CreateCategoryUseCase {
  async execute({ name, description }: ICategoryForm): Promise<CategoryDTO> {
    const categoryExists = await prismaClient.category.findFirst({
      where: { name },
    });

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    const category = await prismaClient.category.create({
      data: {
        description: description,
        name,
      },
    });

    return CategoryDTO.fromCategory(category);
  }
}

export { CreateCategoryUseCase };
