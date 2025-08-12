import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/db/prisma.service';
import { handleError } from 'src/utils/success.response';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { successResponse } from 'src/utils/handle-error';
@Injectable()
export class AuthorsService {
  constructor(private readonly prisma:PrismaService){}
  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const existsEmail = await this.prisma.author.findUnique({
        where: { email: createAuthorDto.email },
      });
      if(existsEmail) {
        throw new ConflictException('Email already exists');
      }
      const author= await this.prisma.author.create({
        data: createAuthorDto,
      });
      return successResponse(author, 201);
    } catch (error) {
      handleError(error)
    }
  }

  async findAll() {
    try {
      const authors = await this.prisma.author.findMany({
        include: { Books: true },
      });
      return successResponse(authors);
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const author = await this.prisma.author.findUnique({
        where:{id:id},
        include: { Books: true },
      })
      if(!author) {
        throw new NotFoundException('Author not found');
      }
      return successResponse(author)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      const author = await this.prisma.author.update({
        where: { id: id },
        data: updateAuthorDto,
      });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      return successResponse(author)
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    try {
      const author= await this.prisma.author.delete({where:{id:id}})
      if(!author) {
        throw new NotFoundException('Author not found');
      }
      return successResponse({})
    } catch (error) {
      handleError(error)
    }
  }
}
