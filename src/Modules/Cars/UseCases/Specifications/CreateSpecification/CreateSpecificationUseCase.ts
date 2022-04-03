import { ISpecificationForm } from '../../../Forms/ISpecificationForm';
import { Specification } from '../../../Models/Specification';
import { ISpecificationsRepository } from '../../../Repositories/ISpecificationsRepository';

class CreateSpecificationUseCase {
  constructor(
    private readonly specificationRepository: ISpecificationsRepository,
  ) {}

  create({ name, description }: ISpecificationForm) {
    const specification = new Specification.Builder()
      .setName(name)
      .setDescription(description)
      .setCreatedAt(new Date())
      .build();

    const specificationExists = this.specificationRepository.findByName(
      specification.name,
    );

    if (specificationExists) {
      throw new Error('Specification already exists');
    }

    return this.specificationRepository.create(specification);
  }
}

export { CreateSpecificationUseCase };
