import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DeepPartial, In, Repository } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { Genre } from 'src/movies/entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';

type DeepPartialWithGenres = DeepPartial<Movie> & { genres?: Genre[] };

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    console.log('Received createMovieDto:', createMovieDto);
  
    const { title, description, releaseDate, genre: genreNames } = createMovieDto;
  
    // Split the genre string into an array for internal processing or validation
    const genreArray = genreNames.split(',');
  
    // Find existing genres
    const existingGenres = await this.genreRepository.find({ where: { name: In(genreArray) } });
  
    // Create genres that don't exist
    const missingGenreNames = genreArray.filter((name) => !existingGenres.find((genre) => genre.name === name));
    const newGenres = missingGenreNames.map((newGenreName) => this.genreRepository.create({ name: newGenreName }));
    const savedGenres = await this.genreRepository.save(newGenres);
  
    // Create the movie entity without the genres property
    const movie: DeepPartial<Movie> = {
      title: title,
      description: description,
      releaseDate: releaseDate,
    };
  
    // Attach genres to the movie
    movie.genres = [...existingGenres, ...savedGenres];
  
    // Save the movie with the associated genres
    return await this.moviesRepository.save(movie);
  }
  

  async findAllMovies() {
    return await this.moviesRepository.find();
  }

  async findOneMovie(id: number) {
    return await this.moviesRepository.findOne({ where: { id } });
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOneMovie(id);

    if (!movie) {
      throw new NotFoundException();
    }

    Object.assign(movie, updateMovieDto);

    return await this.moviesRepository.save(movie);
  }

  async removeMovie(id: number) {
    const movie = await this.findOneMovie(id);

    if (!movie) {
      throw new NotFoundException();
    }

    return await this.moviesRepository.remove(movie);
  }

  async createGenre(createGenreDto: CreateGenreDto) {
    const genre = this.genreRepository.create(createGenreDto);
    return await this.genreRepository.save(genre);
  }

  async findAllGenres() {
    return await this.genreRepository.find();
  }

  async findOneGenre(id: number) {
    return await this.genreRepository.findOne({ where: { id } });
  }

  async removeGenre(id: number) {
    const genre = await this.findOneGenre(id);

    if (!genre) {
      throw new NotFoundException();
    }

    return await this.genreRepository.remove(genre);
  }

  async searchMovies(title: string, genre: string): Promise<Movie[]> {
    let queryBuilder = this.moviesRepository.createQueryBuilder('movie');

    if (title) {
      queryBuilder = queryBuilder.andWhere('movie.title LIKE :title', {
        title: `%${title}%`,
      });
    }

    if (genre) {
      queryBuilder = queryBuilder.innerJoin(
        'movie.genres',
        'genre',
        'genre.name = :genre',
        { genre },
      );
    }

    const movies = await queryBuilder.getMany();
    return movies;
  }
}
