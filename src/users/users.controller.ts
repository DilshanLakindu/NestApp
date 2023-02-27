import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Delete,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserCreateDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { User } from './entity/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { request } from 'http';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async create(@Body() createUserDto: UserCreateDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOneByEmail(loginUserDto.email);
    // const hashedPassword = await bcrypt.hash(loginUserDto.password, 8);
    if (!user) {
      throw new BadRequestException('User not found / Invalid credantials');
    }

    // if (user.password !== loginUserDto.password) {
    //   throw new BadRequestException('Invalid credantials / password mismatch');
    // }

    const jwt = this.jwtService.sign({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Successfully signed',
    };
  }

  //authenticated user
  @Get('user')
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];
    return cookie;
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
