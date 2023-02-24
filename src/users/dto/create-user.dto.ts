import {
  IsString,
  IsOptional,
  MinLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  // @IsOptional()
  // @IsString()
  // role: string;
  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  // // async validatePasword(password: string): Promise<boolean> {
  // //   return await bcrypt.compare(password, this.password);
  // }
}
