import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../db/prisma.service';
import { handleError } from 'src/utils/success.response';
import { successResponse } from 'src/utils/handle-error';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });
      if(existingEmail) {
        throw new ConflictException('Email already exists');
      }
      const user = await this.prisma.user.create({
        data:createUserDto,
      })
      return successResponse(user,201)
    } catch (error) {
      handleError(error)
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({include: { Books: true }});
      return successResponse(users);
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where:{id:id},
        include: { Books: true },
      })
      if(!user) {
        throw new NotFoundException('user not found')
      }
      return successResponse(user)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: updateUserDto,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return successResponse(user);
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    try {
      const user= await this.prisma.user.delete({
        where: { id: id },
      })
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return successResponse({})
    } catch (error) {
      handleError(error)
    }
  }
}
