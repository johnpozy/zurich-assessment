import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { UserDto, UsersService } from 'api/users';
import { COOKIE_TOKEN_NAME } from 'api/utils';

@Injectable()
export class AuthsService {
  constructor(private readonly _jwtService: JwtService, private readonly _usersService: UsersService) {}

  /**
   * Login
   *
   * @param req - Request
   * @param res - Response
   * @returns Promise<any>
   */
  async login(req, res) {
    const { user } = req;
    const accessToken = this._jwtService.sign({
      username: user.username,
      sub: user.id,
      role: user.role,
    });

    res.cookie(COOKIE_TOKEN_NAME, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return {
      ...user,
      accessToken,
    };
  }

  /**
   * Logout
   *
   * @param req - Request
   * @param res - Response
   * @returns Promise<any>
   */
  async logout(req, res) {
    res.clearCookie(COOKIE_TOKEN_NAME, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return 'ok';
  }

  /**
   * Validate user
   *
   * @param username - Username
   * @param password - Password
   * @returns Promise<any>
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._usersService.findOne(username);

    if (!user || user.password !== password) {
      return null;
    }

    return plainToClass(UserDto, JSON.parse(JSON.stringify(user)));
  }
}
