import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/db/prisma.service';
import { handleError } from 'src/utils/success.response';
import { successResponse } from 'src/utils/handle-error';

@Injectable()
export class BooksService {
  constructor(private readonly prisma:PrismaService){}
  async create(createBookDto: CreateBookDto) {
    try {
      const book =await this.prisma.book.create({
        data:createBookDto,
      })
      return successResponse(book,201)
    } catch (error) {
      handleError(error)
    }
  }

  async findAll() {
    try {
      const books = await this.prisma.book.findMany({
        include: { author: true, user: true },
      });
      return successResponse(books)
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.prisma.book.findUnique({
        where: { id: id },
        include: { author: true, user: true },
      });
      if(!book){
        throw new NotFoundException('Book not found');
      }
      return successResponse(book)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.prisma.book.update({
        where:{id:id},
        data:updateBookDto
      })
      if(!book){
        throw new NotFoundException('Book not found');
      }
      return successResponse(book)
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    try {
      const book=await this.prisma.book.delete({
        where:{id:id}
      })
      if(!book){
        throw new NotFoundException('Book not found');
      }
      return successResponse({})
    } catch (error) {
      handleError(error)
    }
  }
}
