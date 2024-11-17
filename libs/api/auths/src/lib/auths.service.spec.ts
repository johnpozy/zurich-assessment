import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthsService } from './auths.service';
import { UsersService } from 'api/users';
import { COOKIE_TOKEN_NAME } from 'api/utils';

describe('AuthsService', () => {
  let service: AuthsService;
  let jwtService: JwtService;
  let usersService: UsersService;

  const mockUser = {
    id: 1,
    username: 'testuser',
    password: 'password123',
    role: 'user',
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-token'),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthsService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthsService>(AuthsService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login user and set cookie', async () => {
      const mockReq = {
        user: mockUser,
      };

      const mockRes = {
        cookie: jest.fn(),
      };

      const result = await service.login(mockReq, mockRes);

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username,
        sub: mockUser.id,
        role: mockUser.role,
      });

      expect(mockRes.cookie).toHaveBeenCalledWith(
        COOKIE_TOKEN_NAME,
        'mock-token',
        {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        }
      );

      expect(result).toEqual({
        ...mockUser,
        accessToken: 'mock-token',
      });
    });
  });

  describe('logout', () => {
    it('should clear cookie on logout', async () => {
      const mockReq = {};
      const mockRes = {
        clearCookie: jest.fn(),
      };

      const result = await service.logout(mockReq, mockRes);

      expect(mockRes.clearCookie).toHaveBeenCalledWith(
        COOKIE_TOKEN_NAME,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
        }
      );

      expect(result).toBe('ok');
    });
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      mockUsersService.findOne.mockResolvedValueOnce(mockUser);

      const result = await service.validateUser('testuser', 'password123');

      expect(mockUsersService.findOne).toHaveBeenCalledWith('testuser');
      expect(result).toBeDefined();
      expect(result.username).toBe(mockUser.username);
    });

    it('should return null if user not found', async () => {
      mockUsersService.findOne.mockResolvedValueOnce(null);

      const result = await service.validateUser('wronguser', 'password123');

      expect(mockUsersService.findOne).toHaveBeenCalledWith('wronguser');
      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      mockUsersService.findOne.mockResolvedValueOnce(mockUser);

      const result = await service.validateUser('testuser', 'wrongpassword');

      expect(mockUsersService.findOne).toHaveBeenCalledWith('testuser');
      expect(result).toBeNull();
    });
  });
});
