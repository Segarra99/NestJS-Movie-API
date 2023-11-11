import { ConflictException, Injectable } from '@nestjs/common';
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

    // Extract genres from the DTO
    const { genre: genreNames, ...otherDtoProps } = updateMovieDto;

    // If genres are provided in the updateMovieDto
    if (genreNames) {
      // Split the genre string into an array for internal processing or validation
      const genreArray = genreNames.split(',');

      // Find existing genres
      const existingGenres = await this.genreRepository.find({ where: { name: In(genreArray) } });

      // Create genres that don't exist
      const missingGenreNames = genreArray.filter((name) => !existingGenres.find((genre) => genre.name === name));
      const newGenres = missingGenreNames.map((newGenreName) => this.genreRepository.create({ name: newGenreName }));
      const savedGenres = await this.genreRepository.save(newGenres);

      // Attach genres to the movie
      movie.genres = [...existingGenres, ...savedGenres];
    }

    // Update other properties of the movie
    Object.assign(movie, otherDtoProps);

    // Save the movie with the associated genres
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
    // Check if the genre already exists
    const existingGenre = await this.genreRepository.findOne({ where: { name: createGenreDto.name } });
  
    if (existingGenre) {
      // If the genre already exists, you can choose to throw an error, return the existing genre, or handle it in a way that fits your application logic.
      // For simplicity, let's throw an error.
      throw new ConflictException('Genre already exists');
    }
  
    // If the genre doesn't exist, create and save it
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
      queryBuilder.andWhere('LOWER(movie.title) LIKE LOWER(:title)', {
        title: `%${title.toLowerCase()}%`,
      });
    }

    if (genre) {
      queryBuilder = queryBuilder
        .innerJoin('movie.genres', 'genre')
        .andWhere('LOWER(genre.name) LIKE :genre', { genre: `%${genre.toLowerCase()}%` });
    }
    

    const movies = await queryBuilder.getMany();
    return movies;
  }
}
