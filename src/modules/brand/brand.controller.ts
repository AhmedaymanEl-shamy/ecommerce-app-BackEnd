import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory/brand.factory';
import { Types } from 'mongoose';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService,private readonly brandFactoryService:BrandFactoryService) {}

  @Post()
 async create(@Body() createBrandDto: CreateBrandDto) {

    const brand = this.brandFactoryService.createBrand(createBrandDto)

    const createdBrand = await this.brandService.create(brand)


    return{

      message:'Done',
      success: true,
      data: {createdBrand}
    }
  }

  @Get()
 async findAll() {

    const brands = await this.brandService.findAll();
    return {
      message:'Done',
      success: true,
      data:{
        brands
      }
    }
  }

  @Get(':brandId')
 async findOne(@Param('brandId') brandId: Types.ObjectId) {

  const brand = await this.brandService.findOne(brandId);
    return  {
      message:'Done',
      success: true,
      data:{
        brand
      }
    }
  }

  @Patch(':brandId')
 async update(@Param('brandId') brandId: Types.ObjectId, @Body() updateBrandDto: UpdateBrandDto) {

    const brand = this.brandFactoryService.updateBrand(updateBrandDto)

    const updatedBrand = await this.brandService.update(brandId, brand);

     return  {
      message:'Brand updated',
      success: true,
      data:{
        updatedBrand
      }
    }
  }

  @Patch('delete/:brandId')
 async remove(@Param('brandId') brandId: Types.ObjectId) {

    await this.brandService.delete(brandId)
    return {
      message:'Brand deleted successfully',
      success:true
    }
  }
}
