import { Category } from '@prisma/client';
import { injectable } from 'tsyringe';
import prisma from '../../../../../database';
@injectable()
class ListCategoriesUseCase {
  async execute(): Promise<Category[]> {
    return await prisma.category.findMany();
  }
}

export { ListCategoriesUseCase };
