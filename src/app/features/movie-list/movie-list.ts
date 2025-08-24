import { Component, inject, signal } from '@angular/core';
import { MovieCard } from './components/movie-card/movie-card';
import { SearchBar } from '@features/movie-list/components/search-bar/search-bar';
import { MovieListService } from '@features/movie-list/services/movie-list-service';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';
import { Button } from '@shared/ui/button/button';
import { Movie } from '@core/interfaces/movieItem';
import { PopUpService } from '@core/services/pop-up.service';

@Component({
  selector: 'app-movie-list',
  imports: [
    MovieCard,
    SearchBar,
    AsyncPipe,
    Button
  ],
  providers: [MovieListService],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList {
  isLoading = signal(false);
  showHelpText = signal(true);
  private readonly movieListService = inject(MovieListService);
  searchTerm = this.movieListService.searchTerm;
  movies$ = this.movieListService.getMovies().pipe(
    tap((value) => {
      this.isLoading.set(false);
      this.showHelpText.set(false);
    })
  );
  private readonly _popUpService = inject(PopUpService);

  onSearch(searchTerm: string | null): void {
    if (!searchTerm) return;
    this.isLoading.set(true);
    this.movieListService.page.next(1);
    this.searchTerm.next(searchTerm);
  }

  loadMore(): void {
    this.isLoading.set(true);
    this.movieListService.loadMore();
  };

  onMovieSelected(item: Movie): void {
    console.log('Selected movie:', item);
    this._popUpService.showPopUp(item);
  }
}
