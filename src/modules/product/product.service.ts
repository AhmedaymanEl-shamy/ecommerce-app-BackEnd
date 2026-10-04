import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './../../models/product/product.repository';
import { BrandRepository } from 'src/models/brand/brand.repository';
import { CategoryRepository } from 'src/models/category/category.repository';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {

  constructor(private readonly productRepo:ProductRepository,private readonly brandRepo:BrandRepository,private readonly categoryRepo:CategoryRepository){}
 async create(product: Product) {

   const productExist = await this.productRepo.getOne({name:product.name})

   if(productExist && !productExist.isDeleted) throw new ConflictException('Product already Exist')



     const categoriesExist =  await this.categoryRepo.getOne({_id:product.categoryId})

   if(!categoriesExist) throw new ConflictException('Category chosen was not found')

    
     const brandExist =  await this.brandRepo.getOne({_id:product.brandId})

   if(!brandExist) throw new ConflictException('Brand chosen was not found')

    if(productExist?.isDeleted){

      return await this.productRepo.update({_id:productExist._id},{isDeleted:false})

    }

    return await this.productRepo.create(product)
  }

 async findAll() {
    const products = await this.productRepo.getAll({isDeleted:false})

    if(products.length == 0) throw new NotFoundException('No products available')

      return products
  }

 async findOne(productId: Types.ObjectId) {

  const productExist = await this.productRepo.getOne({_id:productId})

  if(!productExist || productExist.isDeleted) throw new NotFoundException('Product not found')

    return productExist 
  }

 async update(productId: Types.ObjectId, product: Product) {

  const productExist = await this.productRepo.getOne({_id:productId})

  if(!productExist || productExist.isDeleted) throw new NotFoundException('Product not found')


    return await this.productRepo.update({_id:productId},{...product})
  }

 async delete(productId: Types.ObjectId) {

   const productExist = await this.productRepo.getOne({_id:productId})

   if(!productExist || productExist.isDeleted) throw new NotFoundException('Product not found')

    await this.productRepo.update({_id:productId},{isDeleted:true})
    return true
  }
}
