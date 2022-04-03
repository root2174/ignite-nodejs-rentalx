import { SpecificationDTO } from '../DTO/SpecificationDTO';
import { ISpecificationForm } from '../Forms/ISpecificationForm';
import { Specification } from '../Models/Specification';
import { ISpecificationsRepository } from '../Repositories/ISpecificationsRepository';

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: ISpecificationForm): SpecificationDTO {
    const specification = new Specification.Builder()
      .setName(name)
      .setDescription(description)
      .setCreatedAt(new Date())
      .build();

    const specificationExists = this.specificationsRepository.findByName(
      specification.name,
    );

    if (specificationExists) {
      throw new Error('Specification already exists');
    }

    this.specificationsRepository.create(specification);
    return SpecificationDTO.fromSpecification(specification);
  }
}

export { CreateSpecificationService };
