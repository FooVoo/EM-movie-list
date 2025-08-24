import { afterNextRender, Component, DestroyRef, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  searchTerm = new FormControl('');
  searchRequest = output<string | null>();
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.searchTerm.valueChanges.pipe(
        filter((term) => {
          if (term) {
            return term.length > 2;
          }
          return false;
        }),
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(searchTerm => {
        this.searchRequest.emit(searchTerm);
      });
    });
  }
}
