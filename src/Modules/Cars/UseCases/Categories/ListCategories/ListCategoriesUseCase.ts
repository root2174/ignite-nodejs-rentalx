import { Category } from '@prisma/client';
import { injectable } from 'tsyringe';
import { prismaClient } from '../../../../../database';
@injectable()
class ListCategoriesUseCase {
  async execute(): Promise<Category[]> {
    return await prismaClient.category.findMany();
  }
}

export { ListCategoriesUseCase };
