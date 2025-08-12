import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT=process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('User, Author, Book CRUD API')
    .setVersion('1.0')
    .addTag('Library')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

await app.listen(PORT, () => {
  console.log('🚀 Server running on port:', PORT);
  console.log(`📚 Swagger documentation: http://localhost:${PORT}/api/docs`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api/v1`);
  console.log('✅ Application successfully started!');
  console.log('🎉 Ready to handle requests!');
});
}
bootstrap();
