import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiDocumentationModule } from './swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  ApiDocumentationModule.setup(app);
  await app.listen(3000);
}
bootstrap();
