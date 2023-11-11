import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateGenreDto } from './dto/create-genre.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  findAllMovies() {
    return this.moviesService.findAllMovies();
  }

  @Get(':id')
  findOneMovie(@Param('id') id: string) {
    return this.moviesService.findOneMovie(+id);
  }

  @Patch(':id')
  updateMovie(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.updateMovie(+id, updateMovieDto);
  }

  @Delete(':id')
  removeMovie(@Param('id') id: string) {
    return this.moviesService.removeMovie(+id);
  }

  @Get('genres')
  findALlGenres() {
    return this.moviesService.findAllGenres();
  }

  @Post('genres')
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.moviesService.createGenre(createGenreDto);
  }

  @Delete('genres/:id')
  removeGenre(@Param('id') id: string) {
    return this.moviesService.removeGenre(+id);
  }

  @Get('search')
  searchMovies(
    @Query('title') title: string,
    @Query('genre') genre: string,
    ) {
    return this.moviesService.searchMovies(title, genre);
  }
}
