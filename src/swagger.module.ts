import { Module } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule],
})
export class ApiDocumentationModule {
  static setup(app) {
    const options = new DocumentBuilder()
      .setTitle('Movie API')
      .setDescription('API documentation for the Movie API')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
  }
}
