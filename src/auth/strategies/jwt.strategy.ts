import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entity/user.entity';
import { UserService } from '../../users/users.service';

//JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //Inject the UserService
  //Pass the options to the PassportStrategy Super Class
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  //Validate the payload
  async validate(validationPayload: { email: string }): Promise<User> {
    try {
      console.log('validate');
      return await this.userService.findOneByEmail(validationPayload.email);
    } catch (error) {
      throw new Error(error);
    }
  }
}
