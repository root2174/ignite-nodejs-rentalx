import { injectable } from 'tsyringe';
import { ISpecificationForm } from '../../../Forms/ISpecificationForm';
import { prismaClient } from './../../../../../database/index';

@injectable()
class CreateSpecificationUseCase {
  async create({ name, description }: ISpecificationForm) {
    const specificationExists = await prismaClient.specification.findFirst({
      where: { name },
    });

    if (specificationExists) {
      throw new Error('Specification already exists');
    }

    return await prismaClient.specification.create({
      data: {
        name,
        description,
      },
    });
  }
}

export { CreateSpecificationUseCase };
