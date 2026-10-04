import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductMongoModule } from 'src/shared/modules/product-mong.module';
import { ProductFactoryService } from './factory/product.factory';

@Module({
  imports:[ProductMongoModule],
  controllers: [ProductController],
  providers: [ProductService,ProductFactoryService],
  exports:[ProductFactoryService]

})
export class ProductModule {}
