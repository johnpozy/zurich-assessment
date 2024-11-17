import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AllExceptionsFilter,
  JWT_SECRET_KEY,
  LoggingInterceptor,
  TransformInterceptor,
} from 'api/utils';
import { ProductsModule } from './products/products.module';
import { AuthsModule } from './auths/auths.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_HOST || '0.0.0.0',
      port: +process.env.POSTGRESS_PORT || 5432,
      username: process.env.POSTGRESS_USER || 'user',
      password: process.env.POSTGRESS_PASS || 'password',
      database: process.env.POSTGRESS_DB || 'MOTOR_INSURANCE_WEBSITE',
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['libs/api/**/migrations/*.js'],
      migrationsRun: true,
    }),
    ProductsModule,
    AuthsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
