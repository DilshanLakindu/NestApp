import { BadRequestException, Injectable } from '@nestjs/common';
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
      const newMovie = this.moviesRepository.create({
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

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
