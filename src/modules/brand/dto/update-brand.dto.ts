import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsName } from 'src/common/dto/dto.validation';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateBrandDto {
    
        
           @IsName(2,20)
           @IsOptional()
            name:string
        
            @IsString()
            @IsOptional()
            logo:string
        
            @IsString()
            @IsOptional()
            folderId:string
            
    
            @IsArray()
            @IsMongoId()
            @IsOptional()
            categoryIds: string[]
}
