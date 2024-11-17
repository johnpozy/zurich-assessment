import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductGetQueryDto } from './dtos/product-get-query.dto';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductUpdateDto } from './dtos/product-update.dto';
import { ProductDeleteQueryDto } from './dtos/product-delete-query.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  /**
   * Get all products
   *
   * @param query - ProductQueryDto
   * @returns Promise<Product[]>
   */
  async getProducts(query: ProductGetQueryDto): Promise<Product[]> {
    const { productCode, location } = query;
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (productCode) {
      queryBuilder.andWhere('product.productCode = :productCode', { productCode });
    }

    if (location) {
      queryBuilder.andWhere('product.location = :location', { location });
    }

    return queryBuilder.getMany();
  }

  /**
   * Create a product
   *
   * @param product - ProductCreateDto
   * @returns Promise<Product>
   */
  async createProduct(product: ProductCreateDto): Promise<Product> {
    return this.productRepository.save(product);
  }

  /**
   * Delete a product
   *
   * @param query - ProductDeleteQueryDto
   * @returns Promise<DeleteResult>
   */
  async deleteProduct(query: ProductDeleteQueryDto): Promise<DeleteResult> {
    const { productCode } = query;
    return this.productRepository.delete(productCode);
  }

  /**
   * Update a product
   *
   * @param product - ProductUpdateDto
   * @returns Promise<UpdateResult>
   */
  async updateProduct(product: ProductUpdateDto): Promise<UpdateResult> {
    return this.productRepository.update(product.productCode, product);
  }
}
