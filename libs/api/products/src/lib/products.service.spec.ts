import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]),
  };

  const mockRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return all products when no filters are provided', async () => {
      const result = await service.getProducts({});
      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('product');
      expect(result).toEqual([]);
    });

    it('should filter by productCode when provided', async () => {
      await service.getProducts({ productCode: 'TEST123' });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'product.productCode = :productCode',
        { productCode: 'TEST123' }
      );
    });

    it('should filter by location when provided', async () => {
      await service.getProducts({ location: 'Warehouse A' });
      expect(mockRepository.createQueryBuilder().andWhere).toHaveBeenCalledWith(
        'product.location = :location',
        { location: 'Warehouse A' }
      );
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const productData = {
        productCode: 'TEST123',
        location: 'Warehouse A',
        productDescription: 'Test Product',
        price: 99.99
      };
      mockRepository.save.mockResolvedValue(productData);

      const result = await service.createProduct(productData);
      expect(mockRepository.save).toHaveBeenCalledWith(productData);
      expect(result).toEqual(productData);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by productCode', async () => {
      const deleteResult = { affected: 1 };
      mockRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.deleteProduct({ productCode: 'TEST123' });
      expect(mockRepository.delete).toHaveBeenCalledWith('TEST123');
      expect(result).toEqual(deleteResult);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const updateData = {
        productCode: 'TEST123',
        location: 'Warehouse B',
        productDescription: 'Updated Product',
        price: 149.99
      };
      const updateResult = { affected: 1 };
      mockRepository.update.mockResolvedValue(updateResult);

      const result = await service.updateProduct(updateData);
      expect(mockRepository.update).toHaveBeenCalledWith('TEST123', updateData);
      expect(result).toEqual(updateResult);
    });
  });
});
