import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { Brand, TBrand } from "./brand.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";







@Injectable()
export class BrandRepository extends AbstractRepository<TBrand>{

    constructor(@InjectModel(Brand.name) brandModel: Model<TBrand>){
        super(brandModel)
    }

}