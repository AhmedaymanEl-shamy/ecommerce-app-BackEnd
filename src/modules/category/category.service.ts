import { ConflictException, Injectable } from '@nestjs/common';

import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/models/category/category.repository';
import { Category } from './entities/category.entity';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {


  constructor(private readonly categoryRepo:CategoryRepository){}


 async create(category: Category) {

  const categoryExist = await this.categoryRepo.getOne({name:category.name})

  if(categoryExist) throw new ConflictException('Category already Exist')

 return await this.categoryRepo.create(category)
  }

 async findAll() {
   return this.categoryRepo.getAll({isDeleted:false});
  }

 async findOne(categoryId: Types.ObjectId) {

    const categoryExist = await this.categoryRepo.getOne({_id:categoryId})

    if(!categoryExist || categoryExist.isDeleted) throw new ConflictException('Category not exist')
    return categoryExist ;
  }

 async update(categoryId: Types.ObjectId, category: Category) {

    const categoryExist = await this.categoryRepo.getOne({_id:categoryId})

    if(!categoryExist || categoryExist.isDeleted) throw new ConflictException('Category not exist')

      const updatedCategory = await this.categoryRepo.update({_id:categoryId},{...category})

    return updatedCategory
    
  }


 //soft delete
 async delete(categoryId: Types.ObjectId) {

     const categoryExist = await this.categoryRepo.getOne({_id:categoryId})

    if(!categoryExist || categoryExist.isDeleted) throw new ConflictException('Category not exist')

      await this.categoryRepo.update({_id:categoryId},{isDeleted:true})

      return true

   

  } 
}
