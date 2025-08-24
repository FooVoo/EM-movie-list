import { Movie } from '@core/interfaces/movieItem';

export interface MovieSearchResponse {
  movies: Movie[];
  totalResults: number;
}
