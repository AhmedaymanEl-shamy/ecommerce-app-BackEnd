import { applyDecorators } from "@nestjs/common";
import { IsNotEmpty, IsString,ValidationArguments, registerDecorator, ValidationOptions, MinLength, MaxLength } from "class-validator";
import { DiscountEnum } from "../enums/discount.enums";


export function IsName(min:number = 2 , max:number=20){

   return applyDecorators(
    IsString({ message: 'Name must be a string' }),
    IsNotEmpty({message:'Name is required'}),
    MinLength(min),
    MaxLength(max)
   )
}

export function IsValidDiscount(validationOption?:ValidationOptions){

   return function(object:any,propertyName:string){

      registerDecorator({
         name:"IsValidDiscount",
         target:object.constructor,
         propertyName:propertyName,
         options: validationOption,
         validator:{
        validate(value:any,args: ValidationArguments){

         const obj = args.object as any

         const {discountType , price} = obj

         if(discountType === DiscountEnum.percentage){
            return typeof value === 'number' && value >= 0 && value <=100
         }

           if(discountType === DiscountEnum.fixedAmount){
            return typeof value === 'number' && value >= 0 && value <=price
         }

         return true

        },

        defaultMessage(args:ValidationArguments) {

          const obj = args.object as any

         const {discountType , price,discount} = obj

         
         if(discountType === DiscountEnum.percentage){
              if(discount > 100){
               return "Discount can't exceed 100 when type is percentage"
            }
            return "Value must be a valid positive number"
         }

         
         if(discountType === DiscountEnum.fixedAmount){

            if(discount > price){
               return "Discount number can't exceed the price "
            }
            return 'Value must be a valid positive number'
         }


         return 'invalid discount number'


           
        },
         }
      })

   
   }
}