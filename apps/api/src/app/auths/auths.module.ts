import { Module } from '@nestjs/common';

import { AuthsModule as AuthsLibModule } from 'api/auths';

import { AuthsController } from './auths.controller';

@Module({
  imports: [AuthsLibModule],
  controllers: [AuthsController],
})
export class AuthsModule {}
