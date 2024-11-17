import { Body, Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthLoginDto, AuthsService, LocalAuthGuard } from 'api/auths';
import { UserDto } from 'api/users';

@ApiTags('Auths')
@Controller('auths')
export class AuthsController {
  constructor(private readonly _authsService: AuthsService) {}

  /**
   * Login
   *
   * @param body - LoginDto
   * @returns Promise<{ user: User; accessToken: string }>
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: UserDto })
  async login(@Request() req, @Response({ passthrough: true }) res, @Body() authLoginDto: AuthLoginDto) {
    return await this._authsService.login(req, res);
  }

  /**
   * Logout
   *
   * @returns Promise<any>
   */
  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200 })
  async logout(@Request() req, @Response({ passthrough: true }) res) {
    return await this._authsService.logout(req, res);
  }
}
