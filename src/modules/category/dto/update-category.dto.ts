
import { IsName } from 'src/common/dto/dto.validation';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto{

    @IsName(2,20)
        name:string
    
        @IsString()
        @IsOptional()
        logo:string
    
        @IsString()
        @IsOptional()
        folderId:string

}
