import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getById(id: number): Movie {
    // return this.movies.find((movie) => movie.id === parseInt(id));
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException(`Not found Movie with ID: ${id}`);
    }
    return movie;
  }

  deleteById(id: number) {
    this.getById(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getById(id);
    this.deleteById(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
