import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { version } from '../../../package.json';

async function bootstrap() {
  const prefix = 'api';
  const defaultVersion = '1';
  const port = process.env.APP_PORT || 5000;
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    rawBody: true
  });

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion
  });


  const config = new DocumentBuilder()
    .setTitle('Zurich Assessment API')
    .setDescription('Zurich Assessment API')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${prefix}/docs`, app, document, { customSiteTitle: 'Zurich Assessment API' });

  await app.listen(port, () => {
    Logger.log(`🚀 Zurich Assessment API is running on: http://localhost:${port}/${prefix}/v${defaultVersion}`);
  });
}

bootstrap();
