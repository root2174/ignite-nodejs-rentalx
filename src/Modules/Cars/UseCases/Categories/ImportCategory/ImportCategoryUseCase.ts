import { parse } from 'csv-parse';
import fs from 'fs';
import { prismaClient } from './../../../../../database/index';
interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
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

        const existCategory = await prismaClient.category.findFirst({
          where: { name },
        });

        if (!existCategory) {
          await prismaClient.category.create({
            data: {
              description: description,
              name: name,
            },
          });
        }
      });
    } catch (err) {
      throw new Error('Error loading categories');
    }
  }
}

export { ImportCategoryUseCase };
