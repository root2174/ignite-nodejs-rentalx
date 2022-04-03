import { Specification } from '../Models/Specification';
import { ISpecificationsRepository } from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  findByName(name: string): Specification | undefined {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }
  private specifications: Specification[] = [];

  create(specification: Specification): Specification {
    this.specifications.push(specification);
    return specification;
  }
}

export { SpecificationsRepository };
