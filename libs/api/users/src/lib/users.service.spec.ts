import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user when username exists', async () => {
      const result = await service.findOne('admin');
      expect(result).toEqual({
        id: 1,
        username: 'admin',
        password: 'password',
        role: 'admin',
      });
    });

    it('should return undefined when username does not exist', async () => {
      const result = await service.findOne('nonexistent');
      expect(result).toBeUndefined();
    });
  });
});
