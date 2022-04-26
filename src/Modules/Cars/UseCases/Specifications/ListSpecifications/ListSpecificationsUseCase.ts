import { Specification } from '@prisma/client';
import { injectable } from 'tsyringe';
import { prismaClient } from './../../../../../database/index';

@injectable()
class ListSpecificationUseCase {
  async listAll(): Promise<Specification[]> {
    return await prismaClient.specification.findMany();
  }
}

export { ListSpecificationUseCase };
