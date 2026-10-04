
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './../dto/create-category.dto';
import slugify from 'slugify'

export class CategoryFactoryService{

    createCategory(createCategoryDto:CreateCategoryDto){

        const newCategory = new Category()

        newCategory.name = createCategoryDto.name.toLocaleLowerCase()

        newCategory.slug = slugify(newCategory.name)
        newCategory.logo = createCategoryDto.logo
        newCategory.folderId = createCategoryDto.folderId

        return newCategory

    }

    updateCategory(updateCategoryDto:UpdateCategoryDto){

        const newCategory = new Category()

        newCategory.name = updateCategoryDto.name?.toLocaleLowerCase() as string
        newCategory.slug = slugify(newCategory.name) 
        newCategory.logo = updateCategoryDto.logo as string
        newCategory.folderId = updateCategoryDto.folderId as string

        return newCategory
    }
}