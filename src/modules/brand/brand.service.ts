import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from 'src/models/brand/brand.repository';
import { Brand } from './entities/brand.entity';
import { CategoryRepository } from 'src/models/category/category.repository';
import { Types } from 'mongoose';
import slugify from 'slugify'


@Injectable()
export class BrandService {

  constructor(private readonly brandRepo:BrandRepository, private readonly categoryRepo:CategoryRepository){}

 async create(brand : Brand) {

    const brandExist = await this.brandRepo.getOne({name: brand.name})

      if(brandExist?.isDeleted){

     return await this.brandRepo.update({_id: brandExist._id},{isDeleted:false})

    }

    if(brandExist?.isDeleted == false || brandExist ){
       throw new ConflictException('Brand already exists')
    }

  

   const categoriesExist =  await this.categoryRepo.getAll({_id:{$in:brand.categoryIds}})

   if(categoriesExist.length != brand.categoryIds.length) throw new ConflictException('Categories chosen was not found')

    return await this.brandRepo.create(brand)
    
  }

 async findAll() {
  const brandsExist = await this.brandRepo.getAll({isDeleted:false})

  if(brandsExist.length) throw new NotFoundException('No brands exists')
  return brandsExist
  }

 async findOne(brandId: Types.ObjectId) {

    const brandExist = await this.brandRepo.getOne({_id:brandId})

     if(!brandExist || brandExist.isDeleted) throw new NotFoundException('Brand not found')

      return brandExist
  }

 async update(brandId: Types.ObjectId, brand: Brand) {

    const brandExist = await this.brandRepo.getOne({_id:brandId})

     if(!brandExist || brandExist.isDeleted) throw new NotFoundException('Brand not found')

      console.log(brandExist);
      

    brand.slug = slugify(brand.name)

  
    return await this.brandRepo.update({_id:brandId},{...brand})
  }

 async delete(brandId: Types.ObjectId) {

  const brandExist = await this.brandRepo.getOne({_id:brandId})

   if(!brandExist || brandExist.isDeleted) throw new NotFoundException('Brand not found')

  await this.brandRepo.update({_id: brandId},{isDeleted:true})

  return true

  }
}
