import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from './genre.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: Date;

  @ManyToMany(() => Genre, (genre) => genre.movies, { cascade: true })
  @JoinTable({
    name: 'movies_genres', // The name of the join table
    joinColumn: {
      name: 'movie_id', // The name of the column in the join table that references Movie
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id', // The name of the column in the join table that references Genre
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];
}
