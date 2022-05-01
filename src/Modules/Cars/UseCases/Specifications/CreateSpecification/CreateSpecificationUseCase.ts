import { injectable } from 'tsyringe';
import { ISpecificationForm } from '../../../Forms/ISpecificationForm';
import prisma from './../../../../../database/index';

@injectable()
class CreateSpecificationUseCase {
  async create({ name, description }: ISpecificationForm) {
    const specificationExists = await prisma.specification.findFirst({
      where: { name },
    });

    if (specificationExists) {
      throw new Error('Specification already exists');
    }

    return await prisma.specification.create({
      data: {
        name,
        description,
      },
    });
  }
}

export { CreateSpecificationUseCase };
