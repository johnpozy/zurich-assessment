import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from 'api/utils';
import { JwtAuthGuard, RolesGuard } from 'api/auths';
import { ProductCreateDto, ProductDeleteQueryDto, ProductDto, ProductGetQueryDto, ProductsService, ProductUpdateDto } from 'api/products';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}

  /**
   * Get all products
   *
   * @param query - ProductGetQueryDto
   * @returns Promise<Product[]>
   */
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [ProductDto] })
  getProducts(@Query() query: ProductGetQueryDto) {
    return this._productsService.getProducts(query);
  }

  /**
   * Create a product
   *
   * @param body - ProductCreateDto
   * @returns Promise<Product>
   */
  @Roles(['admin'])
  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 200, type: ProductDto })
  createProduct(@Body() body: ProductCreateDto) {
    return this._productsService.createProduct(body);
  }

  /**
   * Update a product
   *
   * @param body - ProductUpdateDto
   * @returns Promise<Product>
   */
  @Roles(['admin'])
  @Put()
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, type: ProductDto })
  updateProduct(@Body() body: ProductUpdateDto) {
    return this._productsService.updateProduct(body);
  }

  /**
   * Delete a product
   *
   * @param query - ProductDeleteQueryDto
   * @returns Promise<DeleteResult>
   */
  @Roles(['admin'])
  @Delete()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, type: ProductDto })
  deleteProduct(@Query() query: ProductDeleteQueryDto) {
    return this._productsService.deleteProduct(query);
  }
}
