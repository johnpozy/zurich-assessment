import { Test, TestingModule } from '@nestjs/testing';
import { AuthsController } from './auths.controller';
import { AuthsService } from 'api/auths';

describe('AuthsController', () => {
  let controller: AuthsController;
  let authsService: AuthsService;

  const mockAuthsService = {
    login: jest.fn(),
    logout: jest.fn(),
  };

  const mockRequest = {
    user: { id: 1, email: 'test@example.com' },
  };

  const mockResponse = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthsController],
      providers: [
        {
          provide: AuthsService,
          useValue: mockAuthsService,
        },
      ],
    }).compile();

    controller = module.get<AuthsController>(AuthsController);
    authsService = module.get<AuthsService>(AuthsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authsService.login with correct parameters', async () => {
      const loginDto = { username: 'testuser', password: 'password123' };
      const expectedResult = {
        user: { id: 1, username: 'testuser' },
        accessToken: 'mock-token',
      };

      mockAuthsService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(mockRequest, mockResponse, loginDto);

      expect(authsService.login).toHaveBeenCalledWith(mockRequest, mockResponse);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('logout', () => {
    it('should call authsService.logout with correct parameters', async () => {
      const expectedResult = { message: 'Logged out successfully' };
      mockAuthsService.logout.mockResolvedValue(expectedResult);

      const result = await controller.logout(mockRequest, mockResponse);

      expect(authsService.logout).toHaveBeenCalledWith(mockRequest, mockResponse);
      expect(result).toEqual(expectedResult);
    });
  });
});
