import { Specification } from '../../Models/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  public findByName(name: string): Specification | undefined {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  public create(specification: Specification): Specification {
    this.specifications.push(specification);
    return specification;
  }
}

export { SpecificationsRepository };
