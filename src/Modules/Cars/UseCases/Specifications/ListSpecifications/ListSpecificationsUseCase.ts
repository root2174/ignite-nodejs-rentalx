import { Specification } from '@prisma/client';
import { injectable } from 'tsyringe';
import prisma from './../../../../../database/index';

@injectable()
class ListSpecificationUseCase {
  async listAll(): Promise<Specification[]> {
    return await prisma.specification.findMany();
  }
}

export { ListSpecificationUseCase };
