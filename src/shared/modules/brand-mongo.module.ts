import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BrandRepository } from "src/models/brand/brand.repository";
import { Brand, brandSchema } from "src/models/brand/brand.schema";
import { CategoryRepository } from "src/models/category/category.repository";
import { Category, categorySchema } from "src/models/category/category.schema";


@Module({
    imports:[MongooseModule.forFeature([
        {name:Brand.name,schema:brandSchema},
        {name:Category.name,schema:categorySchema}])],
    controllers:[],
    providers:[BrandRepository,CategoryRepository],
    exports:[BrandRepository,CategoryRepository]
})

export class BrandMongoModule{}