import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../entities/product.entity";
import slugify from 'slugify'

export class ProductFactoryService{

    createProduct(createProduct:CreateProductDto){
         const  newProduct = new Product()

         newProduct.name = createProduct.name.toLocaleLowerCase()
         newProduct.slug = slugify(createProduct.name)
         newProduct.price = createProduct.price
         newProduct.stock = createProduct.stock
         newProduct.description = createProduct.description
         newProduct.discount = createProduct.discount
         newProduct.discountType = createProduct.discountType
         newProduct.sizes = createProduct.sizes
         newProduct.colors = createProduct.colors
         newProduct.brandId = createProduct.brandId
         newProduct.categoryId = createProduct.categoryId
         newProduct.mainImage = createProduct.mainImage
         newProduct.subImages = createProduct.subImages

         return newProduct

     
    }

      updateProduct(updateProduct:UpdateProductDto){
         const  newProduct = new Product()

         newProduct.name = updateProduct.name.toLocaleLowerCase()
         newProduct.slug = slugify(updateProduct.name)
         newProduct.price = updateProduct.price
         newProduct.stock = updateProduct.stock
         newProduct.description = updateProduct.description
         newProduct.discount = updateProduct.discount
         newProduct.discountType = updateProduct.discountType
         newProduct.sizes = updateProduct.sizes
         newProduct.colors = updateProduct.colors
         newProduct.brandId = updateProduct.brandId
         newProduct.categoryId = updateProduct.categoryId
         newProduct.mainImage = updateProduct.mainImage
         newProduct.subImages = updateProduct.subImages

         return newProduct

     
    }


  
}