import { Category } from '@prisma/client';

class CategoryDTO {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  private constructor(
    id: string,
    name: string,
    description: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
  }

  static fromCategory(category: Category): CategoryDTO {
    return new CategoryDTO(
      category.id,
      category.name,
      category.description,
      category.createdAt,
    );
  }
}

export { CategoryDTO };
