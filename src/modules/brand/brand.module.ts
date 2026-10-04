import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandMongoModule } from 'src/shared/modules/brand-mongo.module';
import { BrandFactoryService } from './factory/brand.factory';

@Module({
  imports:[BrandMongoModule],
  controllers: [BrandController],
  providers: [BrandService,BrandFactoryService],
})
export class BrandModule {}
