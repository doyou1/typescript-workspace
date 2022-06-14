import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  // 불필요
  //   @IsString()
  //   readonly title?: string;
  //   @IsNumber()
  //   readonly year?: number;
  //   @IsString({ each: true })
  //   readonly genres?: string[];
}
