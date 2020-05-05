import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  // pull server property from config files: NODE_ENV specific (development by default)
  const serverConfig = config.get('server');
  // env configurable port number
  const port = process.env.PORT || serverConfig.port;

  const logger = new Logger('boostrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  /*
    else {
      app.enableCors({origin: serverConfig.origin});
    }
  */

  await app.listen(port);
  logger.log(`listening on port: ${port}`);
}
bootstrap();
