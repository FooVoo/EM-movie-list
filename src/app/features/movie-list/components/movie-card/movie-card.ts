import { Component, input, output } from '@angular/core';
import { Movie } from '@core/interfaces/movieItem';
import { ToTagPipe } from '@features/movie-list/pipes/to-tag-pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [
    ToTagPipe,
    NgOptimizedImage
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard {
  movie = input.required<Movie>();
  movieSelected = output<Movie>();

  onMovieSelected(): void {
    this.movieSelected.emit(this.movie());
  }
}
