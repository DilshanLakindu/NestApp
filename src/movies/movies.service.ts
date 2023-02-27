import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const newMovie = await this.moviesRepository.create({
        ...createMovieDto,
      });
      const savedMovie = await this.moviesRepository.save(newMovie);
      console.log(savedMovie);
      return savedMovie;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Somethig error');
      }
      throw error;
    }
  }

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find();
  }

  async findOne(movieId: number): Promise<Movie> {
    return await this.moviesRepository.findOneBy({
      movieId,
    });
  }

  async update(
    movieId: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    try {
      const movie = await this.moviesRepository.findOneBy({ movieId });

      if (!movie) {
        throw new UnauthorizedException('Movie not found');
      }
      await this.moviesRepository.update(movieId, updateMovieDto);
      const updatedMovie = await this.moviesRepository.findOneBy({ movieId });
      return updatedMovie;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Somethig error');
      }
    }
  }

  async remove(movieId: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ movieId });
    if (!movie) {
      throw new BadRequestException('Movie not found');
    } else {
      await this.moviesRepository.delete(movieId);
      return movie;
    }
  }
}
