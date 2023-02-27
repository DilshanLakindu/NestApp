import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { User } from './../users/entity/user.entity';
import { UserCreateDto } from '../../src/users/dto/create-user.dto';
@Controller('auth')
export class AuthController {
  //Inject the AuthService
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Post('/signup')
  async signUp(@Body() body: UserCreateDto) {
    return await this.authService.signUp(body);
  }

  // @UseGuards(GoogleAuthGuard)
  // @Get('/google/login')
  // async logout(@Req() req: Request) {
  //   return { msg: 'ok' };
  // }

  // @UseGuards(GoogleAuthGuard)
  // @Get('/google/redirect')
  // refresh(@Req() req: Request, @Res() res: Response) {
  //   const token = this.authService.login(req.user as User);
  //   res.json(token);
  // }
}
