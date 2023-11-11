import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({
    description: 'The name of the genre',
    example: 'Action',
  })
  name: string;
}