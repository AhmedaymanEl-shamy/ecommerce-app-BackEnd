import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFactoryService } from './factory/product.factory';
import { Types } from 'mongoose';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly productFactoryService:ProductFactoryService) {}

  @Post()
 async create(@Body() createProductDto: CreateProductDto) {

    const product = this.productFactoryService.createProduct(createProductDto)

    const createdProduct = await this.productService.create(product)
    return {
      message: "Done",
      success: true,
      data: {
        createdProduct
      }
    }
  }

  @Get()
 async findAll() {

    const products = await this.productService.findAll();
    return {
      message:'Done',
      success:true,
      data:{
        products
      }
    }
  }

  @Get(':productId')
 async findOne(@Param('productId') productId: Types.ObjectId) {

    const product = await this.productService.findOne(productId);
    return{
      message:'Done',
      success:true,
      data:{
        product
      }
    } 
  }

  @Patch(':productId')
 async update(@Param('productId') productId: Types.ObjectId, @Body() updateProductDto: UpdateProductDto) {

    const product = this.productFactoryService.updateProduct(updateProductDto)

    const updatedProduct = await this.productService.update(productId, product);
    return {
      message:'Done',
      success:true,
      data:{
        updatedProduct
      }
    }
  }

  @Patch('delete/:productId')
 async delete(@Param('productId') productId: Types.ObjectId) {

  await this.productService.delete(productId)
    return {
      message:'Product deleted ',
      success: true
    }
  }
}
