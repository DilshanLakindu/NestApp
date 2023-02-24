import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
} from 'typeorm';
@Entity('movies')
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  movieId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: string;
}
