import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import { ACTIVE } from 'src/_cores/constants/app.constant';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    let parentCategory: Category = null;

    if (createCategoryDto.parentId)
      parentCategory = await this.findOne(createCategoryDto.parentId);

    const category = new Category();

    category.parent = parentCategory;

    Object.assign(category, createCategoryDto);

    return this.categoryRepository.save(category);
  }

  async findAll() {
    return this.categoryRepository.find({
      where: { isActive: ACTIVE, parent: IsNull() },
      relations: {
        children: ACTIVE,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id, isActive: ACTIVE },
      relations: {
        children: ACTIVE,
      },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id, isActive: ACTIVE },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findById(id);

    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findById(id);

    return this.categoryRepository.softRemove(category);
  }
}
