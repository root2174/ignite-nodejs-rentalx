import { Specification } from '../Models/Specification';

interface ISpecificationsRepository {
  create(specification: Specification): Specification;
  findByName(name: string): Specification | undefined;
}

export { ISpecificationsRepository };
