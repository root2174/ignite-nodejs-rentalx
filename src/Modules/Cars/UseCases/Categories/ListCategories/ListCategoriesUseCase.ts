import { Category } from '@prisma/client';
import { prismaClient } from '../../../../../database';

class ListCategoriesUseCase {
  async execute(): Promise<Category[]> {
    return await prismaClient.category.findMany();
  }
}

export { ListCategoriesUseCase };
