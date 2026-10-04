import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { Product, TProduct } from "./product.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";



@Injectable()
export class ProductRepository extends AbstractRepository<TProduct>{

    constructor(@InjectModel(Product.name) productModel: Model<TProduct>){
        super(productModel)
    }

}