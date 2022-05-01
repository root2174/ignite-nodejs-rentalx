import 'reflect-metadata';
import { AppError } from '../../../../../errors/AppError';
import { prismaMock } from './../../../../../database/prismaClientMock';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Create category', () => {
  it('creates a category without errors', () => {
    const category = {
      id: '123',
      createdAt: new Date(),
      name: 'Mocked Category',
      description: 'Mocked Category',
    };

    const createCategoryUseCase = new CreateCategoryUseCase();

    // @ts-ignore
    prismaMock.category.create.mockResolvedValue(category);

    expect(createCategoryUseCase.execute({ ...category })).resolves.toEqual(
      category,
    );
  });

  it('throws an error when the category already exists', () => {
    const category = {
      id: '123',
      createdAt: new Date(),
      name: 'Mocked Category',
      description: 'Mocked Category',
    };

    const createCategoryUseCase = new CreateCategoryUseCase();
    // @ts-ignore
    prismaMock.category.findFirst.mockResolvedValue(category);

    expect(
      createCategoryUseCase.execute({ ...category }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
