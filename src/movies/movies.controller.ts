import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { User } from 'src/users/entity/user.entity';
import { Movie } from './entities/movie.entity';
import { Request } from 'express';
import { jwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(jwtAuthGuard)
  @Post('postMovie')
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Req() req: Request,
  ): Promise<Movie> {
    console.log('Posting', req.user as User);
    return this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') movieId: number) {
    const movie = this.moviesService.findOne(movieId);
    if (!movie) {
      throw new BadRequestException('Movie not found');
    }
  }

  @UseGuards(jwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
    @Req() req: Request,
  ) {
    return await this.moviesService.update(movieId, updateMovieDto);
  }

  @UseGuards(jwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') movieId: number, @Req() req: Request) {
    try {
      await this.moviesService.remove(movieId);
      return [
        {
          status: 200,
          message: 'Movie deleted successfully',
        },
      ];
    } catch (error) {
      return error;
    }
  }
}
