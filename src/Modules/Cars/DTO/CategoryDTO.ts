import { Category } from '../Models/Category';

class CategoryDTO {
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

  static fromCategory(category: Category): CategoryDTO {
    return new CategoryDTO(
      category.id,
      category.name,
      category.description,
      category.created_at,
    );
  }
}

export { CategoryDTO };
