import { Types } from "mongoose";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { Brand } from "../entities/brand.entity";
import slugify from 'slugify'
import { UpdateBrandDto } from "../dto/update-brand.dto";


export class BrandFactoryService{

    createBrand(createBrandDto: CreateBrandDto){
        const newBrand = new Brand()

        newBrand.name = createBrandDto.name.toLocaleLowerCase()
        newBrand.slug = slugify(newBrand.name)
        newBrand.logo = createBrandDto.logo
        newBrand.folderId = createBrandDto.folderId
        newBrand.categoryIds = createBrandDto.categoryIds.map((id)=> new Types.ObjectId(id))

        return newBrand;
    }

     updateBrand(updateBrandDto: UpdateBrandDto){
        const newBrand = new Brand()

        newBrand.name = updateBrandDto.name?.toLocaleLowerCase()
        newBrand.slug = slugify(updateBrandDto.name ? newBrand.name : "")
        newBrand.logo = updateBrandDto.logo
        newBrand.folderId = updateBrandDto.folderId
        newBrand.categoryIds = updateBrandDto.categoryIds?.map((id)=> new Types.ObjectId(id))

        return newBrand;
    }
}