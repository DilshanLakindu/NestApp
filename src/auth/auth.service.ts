import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from '../../src/users/dto/create-user.dto';
import { User } from '../users/entity/user.entity';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //check recieved username and password match
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }
    const passwordIsValid = user.password === pass;

    return passwordIsValid ? user : null;
  }

  login(user: User) {
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
