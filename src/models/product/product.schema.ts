import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { DiscountEnum } from "src/common/enums/discount.enums";

export type TProduct = Product & Document

@Schema({timestamps:true})
export class Product{


      @Prop({type:String,required:true,trim:true})
      name:string
        
            @Prop({type:String,required:true,trim:true})
            slug:string
        
            @Prop({type:String,required:true})
            description:string

            @Prop({type:Number,required:true,min:1})
            price:number

            @Prop({type:Number,min:1})
            discount:number

            @Prop({type:String,enum:DiscountEnum,default:DiscountEnum.fixedAmount})
            discountType:string

             @Prop({type:Number,min:0})
            stock:number

             @Prop({type:String})
             folderId:string
              
             @Prop({type:{type:mongoose.Schema.Types.ObjectId,ref:'Category'}})
             categoryId: Types.ObjectId


            @Prop({type:{type:mongoose.Schema.Types.ObjectId,ref:'Category'}})
            subCategory: Types.ObjectId

            @Prop({type:{type:mongoose.Schema.Types.ObjectId,ref:'Brand'}})
            brandId:Types.ObjectId


            @Prop({type:{type:mongoose.Schema.Types.ObjectId,ref:'User'}})
             createdBy: Types.ObjectId

            @Prop({type:{type:mongoose.Schema.Types.ObjectId,ref:'User'}})
            updatedBy: Types.ObjectId


             @Prop({type:[String]})
            colors:string[]

            @Prop({type:[String]})
            sizes: string[]

             @Prop({type:String,required:true})
            mainImage: string

             @Prop({type:[String]})
            subImages: string[]


            @Prop({type:Boolean,default:false})
            isDeleted:boolean
}

export const productSchema = SchemaFactory.createForClass(Product)