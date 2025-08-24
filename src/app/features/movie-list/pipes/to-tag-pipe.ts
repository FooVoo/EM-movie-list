import { Pipe, PipeTransform } from '@angular/core';
import { MovieGenreAsTag } from '@core/interfaces/movieItem';

@Pipe({
  name: 'toTag'
})
export class ToTagPipe implements PipeTransform {

  transform(value?: string): MovieGenreAsTag[] {
    if (!value) return [];
    return value.split(',')
      .map(genre => genre.trim())
      .map((genre, idx) => {
        return {
          name: genre,
          id: idx
        }
      })
  }

}
