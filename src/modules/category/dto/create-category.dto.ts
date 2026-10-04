import {IsOptional, IsString} from "class-validator"
import { IsName } from "src/common/dto/dto.validation"

export class CreateCategoryDto {


   @IsName(2,20)
    name:string

    @IsString()
    @IsOptional()
    logo:string

    @IsString()
    @IsOptional()
    folderId:string
}
