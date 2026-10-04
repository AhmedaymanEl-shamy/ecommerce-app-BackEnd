import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator"
import { IsName, IsValidDiscount } from "src/common/dto/dto.validation"
import { DiscountEnum } from "src/common/enums/discount.enums"

import {Transform} from "class-transformer"
import { Types } from "mongoose"

export class CreateProductDto {

    @IsName()
    name:string

    @IsName(15,500)
    description:string

    @IsPositive()
    @IsNumber()
    @Min(1)
    price:number

    @IsValidDiscount()
    discount:number


    @IsString()
    @IsEnum(DiscountEnum)
    discountType: DiscountEnum

    @IsNumber()
    @IsNotEmpty()
    @Transform(({value})=> value ?? 1)
    stock:number

    @IsArray()
    @IsString({each:true})
    colors:string[]

    @IsArray()
    @IsString({each:true})
    sizes:string[]

    @IsString()
    @IsNotEmpty()
    mainImage:string

    @IsArray()
    @IsString({each:true})
    subImages:string[]


    @IsMongoId()
   
    categoryId: Types.ObjectId


    @IsMongoId()
   
    brandId: Types.ObjectId


}
