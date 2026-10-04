
import { IsArray, IsEnum, IsMongoId, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IsValidDiscount } from 'src/common/dto/dto.validation';
import { DiscountEnum } from 'src/common/enums/discount.enums';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class UpdateProductDto {


        @IsString()
        @MaxLength(20)
        @MinLength(2)
        name:string    

        @IsString()
        @MaxLength(500)
        @MinLength(2)
        description:string
    
        @IsPositive()
        @IsNumber()
        @Min(1)
        price:number
    
        @IsValidDiscount()
        discount:number
    
    
        @IsString()
        @IsEnum(DiscountEnum)
        @IsOptional()
        discountType: DiscountEnum
    
        @IsNumber()
        @Transform(({value})=> value ?? 1)
        stock:number
    
        @IsArray()
        @IsString({each:true})
        colors:string[]
    
        @IsArray()
        @IsString({each:true})
        sizes:string[]
    
        @IsString()
       
        mainImage:string
    
        @IsArray()
        @IsString({each:true})
        subImages:string[]
    
    
        @IsMongoId()
       
        categoryId: Types.ObjectId
    
    
        @IsMongoId()
       
        brandId: Types.ObjectId
    
}
