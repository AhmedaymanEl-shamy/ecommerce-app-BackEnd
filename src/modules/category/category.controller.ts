import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './factory/category.factory';
import { Types } from 'mongoose';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,private readonly categoryFactoryService: CategoryFactoryService) {}

  @Post()
 async create(@Body() createCategoryDto: CreateCategoryDto) {

   const category =  this.categoryFactoryService.createCategory(createCategoryDto)

   const createdCategory = await this.categoryService.create(category);
    return {
      message: 'Done',
      success: true,
      data: {createdCategory}
    }
  }

  @Get()
 async findAll() {

  const categories= await this.categoryService.findAll()
   return {
      message: 'Done',
      success: true,
      data: {categories}
    }
  }

  @Get(':categoryId')
 async findOne(@Param('categoryId') categoryId: Types.ObjectId) {

  const category = await this.categoryService.findOne(categoryId)
   return { 
      message:'Done',
      success:true,
      data:{category}
    } ;
  }

  @Patch(':categoryId')
 async update(@Param('categoryId') categoryId: Types.ObjectId, @Body() updateCategoryDto: UpdateCategoryDto) {

   const category = this.categoryFactoryService.updateCategory(updateCategoryDto)

   const updatedCategory = await this.categoryService.update(categoryId,category as unknown as Category )
    return { 
      message:'Done',
      success:true,
      data:{updatedCategory}
    } ;
  }

  @Post('delete/:categoryId')
 async remove(@Param('categoryId') categoryId: Types.ObjectId) {
   await this.categoryService.delete(categoryId);
    return {
      message:'done',
      success:true
    }
  }
}
