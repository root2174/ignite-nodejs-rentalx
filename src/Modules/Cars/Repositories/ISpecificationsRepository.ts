import { Specification } from '../Models/Specification';

interface ISpecificationsRepository {
  create(specification: Specification): void;
  findByName(name: string): Specification | undefined;
}

export { ISpecificationsRepository };
