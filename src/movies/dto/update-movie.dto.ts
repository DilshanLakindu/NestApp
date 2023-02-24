import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  static readonly collectionName = 'MovieDto';

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  releaseDate?: string;
}
