import { Specification } from '../Models/Specification';

class SpecificationDTO {
  id: string;
  name: string;
  description: string;
  created_at: Date;

  private constructor(
    id: string,
    name: string,
    description: string,
    created_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
  }

  static fromSpecification(specification: Specification): SpecificationDTO {
    return new SpecificationDTO(
      specification.id,
      specification.name,
      specification.description,
      specification.created_at,
    );
  }
}

export { SpecificationDTO };
