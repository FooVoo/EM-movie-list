import { inject, Injectable } from '@angular/core';
import { Api } from '@core/services/api';
import { auditTime, BehaviorSubject, combineLatest, Observable, scan, Subject, switchMap } from 'rxjs';
import { MovieSearchResponse } from '@core/interfaces/api';

@Injectable()
export class MovieListService {
  public readonly searchTerm = new Subject<string>();
  public readonly page = new BehaviorSubject(1);
  private readonly _apiService = inject(Api);

  loadMore(): void {
    this.page.next(this.page.value + 1);
  }

  getMovies(): Observable<MovieSearchResponse> {
    return combineLatest({
      searchTerm: this.searchTerm,
      page: this.page
    }).pipe(
      auditTime(100),
      switchMap(({ searchTerm, page }) => {
        return this._apiService.searchMoviesByTitle(searchTerm, page);
      }),
      scan((acc, curr) => {
        if (this.page.value === 1) {
          return curr;
        }
        acc.movies = acc.movies.concat(curr.movies);
        return acc;
      })
    );
  }
}
