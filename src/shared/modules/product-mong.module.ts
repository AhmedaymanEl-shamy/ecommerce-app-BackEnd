import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BrandRepository } from "src/models/brand/brand.repository";
import { Brand, brandSchema } from "src/models/brand/brand.schema";
import { CategoryRepository } from "src/models/category/category.repository";
import { Category, categorySchema } from "src/models/category/category.schema";
import { ProductRepository } from "src/models/product/product.repository";
import { Product, productSchema } from "src/models/product/product.schema";



@Module({
    imports:[MongooseModule.forFeature([{name:Product.name,schema:productSchema}, {name:Brand.name,schema:brandSchema},
            {name:Category.name,schema:categorySchema}])],
    controllers:[],
    providers:[ProductRepository,BrandRepository,CategoryRepository],
    exports:[ProductRepository,BrandRepository,CategoryRepository]
})

export class ProductMongoModule{}