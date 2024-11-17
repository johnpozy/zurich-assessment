import { Module } from '@nestjs/common';

import { ProductsModule as ProductsLibModule } from 'api/products';

import { ProductsController } from './products.controller';

@Module({
  imports: [ProductsLibModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
