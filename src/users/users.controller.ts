import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserCreateDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: UserCreateDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params) {
    const user = await this.userService.findOneById(params.id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  @Patch(':id')
  async update(@Param() params, @Body() body) {
    const user = await this.userService.updateUser(params.id, body);
    return user;
  }

  @Delete(':id')
  async delete(@Param() params) {
    const user = await this.userService.deleteUser(params.id);
    return user;
  }
}
