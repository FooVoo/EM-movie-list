import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieSearchResponse } from '@core/interfaces/api';
import { Movie } from '@core/interfaces/movieItem';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly httpClient = inject(HttpClient);
  private readonly _baseUrl = "https://www.omdbapi.com/?apiKey=171b391f";

  public searchMoviesByTitle(title: string, page: number = 1): Observable<MovieSearchResponse> {
    return this.httpClient.get(`${this._baseUrl}&s=${title}&page=${page}`).pipe(
      map((response: any) => {
        if ('Response' in response && response['Response'] === 'True') {
          let movies: Movie[] = [];
          let totalResults = 0;
          if ('Search' in response) {
            movies = response['Search'] as Movie[];
          }
          if ('totalResults' in response) {
            totalResults = parseInt(response['totalResults'], 10);
          }
          return {movies, totalResults} as MovieSearchResponse;
        }
        console.error('API Error:', response['Error'] || 'Unknown error');
        return {
          movies: [],
          totalResults: 0
        }
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
        windowTime: 60000,
      })
    );
  }

  public getMovieById(id: string): Observable<Movie | null> {
    return this.httpClient.get(`${this._baseUrl}&i=${id}`).pipe(
      map((response: any) => {
        if ('Response' in response && response['Response'] === 'True') {
          return response as Movie;
        }
        console.error('API Error:', response['Error'] || 'Unknown error');
        return null;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
        windowTime: 60000,
      })
    );
  }
}
