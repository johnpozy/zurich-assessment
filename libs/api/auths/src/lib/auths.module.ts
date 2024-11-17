import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule as UsersLibModule } from 'api/users';

import { JWT_SECRET_KEY } from 'api/utils';

import { AuthsService } from './auths.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    UsersLibModule,
  ],
  providers: [AuthsService, LocalStrategy, JwtStrategy],
  exports: [AuthsService],
})
export class AuthsModule {}
