import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './db/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthorsModule, BooksModule],
})
export class AppModule {}
