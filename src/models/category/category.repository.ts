import { AbstractRepository } from "../abstract.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Category, TCategory } from "./category.schema";

@Injectable()
export class CategoryRepository extends AbstractRepository<TCategory>{

    constructor(@InjectModel(Category.name) categoryModel: Model<TCategory>){
        super(categoryModel)
    }

}