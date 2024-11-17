import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from 'api/products';
import { ProductGetQueryDto } from 'api/products';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    getProducts: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const query: ProductGetQueryDto = {
        productCode: 'TEST-001',
        location: 'Test Location',
      };
      const result = [{
        id: 1,
        name: 'Test Product',
        productCode: 'TEST-001',
        productDescription: 'Test Description',
        location: 'Test Location',
        price: 99.99
      }];

      jest.spyOn(service, 'getProducts').mockResolvedValue(result);

      expect(await controller.getProducts(query)).toBe(result);
      expect(service.getProducts).toHaveBeenCalledWith(query);
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const createDto = {
        name: 'New Product',
        price: 100,
        productCode: 'TEST-001',
        productDescription: 'Test Description',
        location: 'Test Location'
      };
      const result = {
        id: 1,
        ...createDto,
        productCode: 'TEST-001',
        productDescription: 'Test Description',
        location: 'Test Location'
      };

      jest.spyOn(service, 'createProduct').mockResolvedValue(result);

      expect(await controller.createProduct(createDto)).toBe(result);
      expect(service.createProduct).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const updateDto = {
        id: 1,
        name: 'Updated Product',
        productCode: 'TEST-001',
        productDescription: 'Test Description',
        location: 'Test Location',
        price: 99.99
      };
      const result = { affected: 1, raw: [], generatedMaps: [] };

      jest.spyOn(service, 'updateProduct').mockResolvedValue(result);

      expect(await controller.updateProduct(updateDto)).toBe(result);
      expect(service.updateProduct).toHaveBeenCalledWith(updateDto);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const query = { productCode: 'TEST-001' };
      const result = { affected: 1, raw: [], generatedMaps: [] };

      jest.spyOn(service, 'deleteProduct').mockResolvedValue(result);

      expect(await controller.deleteProduct(query)).toBe(result);
      expect(service.deleteProduct).toHaveBeenCalledWith(query);
    });
  });
});
