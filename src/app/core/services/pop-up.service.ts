import { Injectable, signal } from '@angular/core';
import { Movie } from '@core/interfaces/movieItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  isPopUpHidden = signal(true);
  selectedMovie = new BehaviorSubject<Movie | null>(null);

  showPopUp(movie: Movie) {
    this.isPopUpHidden.set(false);
    this.selectedMovie.next(movie);
  }
}
