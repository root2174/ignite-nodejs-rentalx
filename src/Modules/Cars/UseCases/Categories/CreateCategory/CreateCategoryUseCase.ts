import { injectable } from 'tsyringe';
import { AppError } from '../../../../../errors/AppError';
import { CategoryDTO } from '../../../DTO/CategoryDTO';
import { ICategoryForm } from '../../../Forms/ICategoryForm';
import prisma from './../../../../../database/index';
@injectable()
class CreateCategoryUseCase {
  async execute({ name, description }: ICategoryForm): Promise<CategoryDTO> {
    const categoryExists = await prisma.category.findFirst({
      where: { name },
    });

    if (categoryExists) {
      throw new AppError('Category already exists');
    }

    const category = await prisma.category.create({
      data: {
        description: description,
        name,
      },
    });

    return CategoryDTO.fromCategory(category);
  }
}

export { CreateCategoryUseCase };
