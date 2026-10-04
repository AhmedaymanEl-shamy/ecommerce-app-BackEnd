import { Types } from "mongoose"
import { DiscountEnum } from "src/common/enums/discount.enums"

export class Product {

    
        name:string

        slug:string
    
        description:string
    
        price:number
    
        discount:number
    
        discountType: DiscountEnum
    
        stock:number
    
        colors:string[]
    
        sizes:string[]
    
        
        mainImage:string

        subImages:string[]

        categoryId: Types.ObjectId
       
        brandId: Types.ObjectId
}
