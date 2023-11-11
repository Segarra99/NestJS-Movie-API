import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'Updated Movie Title',
  })
  title?: string;

  @ApiProperty({
    description: 'The description of the movie',
    example: 'Updated movie description...',
  })
  description?: string;

  @ApiProperty({
    description: 'The release date of the movie',
    example: '2023-11-10T12:00:00.000Z',
  })
  releaseDate?: Date;

  @ApiProperty({
    description: 'The genre of the movie',
    example: 'horror,sad',
  })
  genre?: string;

}
