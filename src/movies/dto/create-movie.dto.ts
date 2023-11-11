import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Shawshank Redemption'
  })
  title: string;

  @ApiProperty({
    description: 'The description of the movie',
    example: 'Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.'
  })
  description: string;

  @ApiProperty({
    description: 'The release date of the movie',
    example: '1994-09-23T00:00:00.000Z'
  })
  releaseDate: Date;

  @ApiProperty({
    description: 'The genre of the movie',
    example: 'Drama,Crime'
  })
  genre: string;
}