import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from '../../src/users/dto/create-user.dto';
import { User } from '../users/entity/user.entity';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //check recieved username and password match
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    console.log(user);
    if (!user) {
      return null;
    }
    try {
      const validPassword = await bcrypt.compare(pass, user.password);
      console.log('valid', validPassword);
      if (!validPassword) return null;
      return user;
    } catch (e) {
      console.log('error', e);
    }
  }

  login(user: User) {
    console.log('user');
    const payload = {
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // create new user
  async signUp(userInfo: UserCreateDto): Promise<any> {
    return await this.userService.createUser(userInfo);
  }
}
