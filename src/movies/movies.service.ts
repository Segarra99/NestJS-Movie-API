import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(movie);
  }

  async findAll() {
    return await this.moviesRepository.find();
  }

  async findOne(id: number) {
    return await this.moviesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    if(!movie) {
      throw new NotFoundException()
    }

    Object.assign(movie, updateMovieDto);

    return await this.moviesRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);

    if(!movie) {
      throw new NotFoundException()
    }

    return await this.moviesRepository.remove(movie);
  }
}
