import { Component, inject, signal } from '@angular/core';
import { PopUpService } from '@core/services/pop-up.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Api } from '@core/services/api';
import { delay, of, switchMap, tap } from 'rxjs';
import { Button } from '@shared/ui/button/button';
import { ToTagPipe } from '@features/movie-list/pipes/to-tag-pipe';

@Component({
  selector: 'app-pop-up',
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    Button,
    ToTagPipe
  ],
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css'
})
export class PopUp {
  readonly apiService = inject(Api);
  isLoading = signal(false);
  private readonly popUpService = inject(PopUpService);
  isHidden = this.popUpService.isPopUpHidden.asReadonly();
  selectedMovie = this.popUpService.selectedMovie.pipe(
    tap(() => {
      this.isLoading.set(true);
    }),
    delay(600),
    switchMap(movie => {
      if (movie) {
        return this.apiService.getMovieById(movie.imdbID);
      }
      return of(null);
    }),
    tap(() => {
      this.isLoading.set(false);
    })
  );

  closePopUp() {
    this.popUpService.isPopUpHidden.set(true);
    this.popUpService.selectedMovie.next(null);
  }
}
