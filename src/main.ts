import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const httpsOptions = {
    key: fs.readFileSync('cert.key'),
    cert: fs.readFileSync('cert.crt'),
  };

  const httpApp = await NestFactory.create(AppModule);
  await httpApp.listen(process.env.HTTP_PORT);
  logger.log(`HTTP Server is running on: ${await httpApp.getUrl()}`);

  const httpsApp = await NestFactory.create(AppModule, { httpsOptions });
  await httpsApp.listen(process.env.HTTPS_PORT);
  logger.log(`HTTPS Server is running on: ${await httpApp.getUrl()}`);
}
bootstrap();
