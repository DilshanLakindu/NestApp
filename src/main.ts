import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParserMiddleware);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server started on port ${port}`);
}
bootstrap();
