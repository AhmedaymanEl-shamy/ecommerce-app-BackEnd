import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryRepository } from "src/models/category/category.repository";
import { Category, categorySchema } from "src/models/category/category.schema";



@Module({
    imports:[MongooseModule.forFeature([{name:Category.name,schema:categorySchema}])],
    controllers:[],
    providers:[CategoryRepository],
    exports:[CategoryRepository]
})


export class CategoryMongoModule{}