import { parse } from 'csv-parse';
import fs from 'fs';
import { Category } from '../../../Models/Category';
import { CategoriesRepository } from '../../../Repositories/Implementations/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();
      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', async () => {
          await fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    try {
      const categories = await this.loadCategories(file);

      categories.map(async category => {
        const { name, description } = category;

        const existCategory = this.categoriesRepository.findByName(name);

        if (!existCategory) {
          const newCategory = new Category.Builder()
            .setName(name)
            .setDescription(description)
            .build();

          this.categoriesRepository.create(newCategory);
        }
      });
    } catch (err) {
      throw new Error('Error loading categories');
    }
  }
}

export { ImportCategoryUseCase };
