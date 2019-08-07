import { Pipe, PipeTransform } from '@angular/core';
import { MovieCategory } from './movie-category';

@Pipe({
  name: 'genre',
})
export class GenrePipe implements PipeTransform {
  transform(genreCategories: MovieCategory[], ...args: any[]): any {
    return genreCategories.filter(
      genreCategory => genreCategory.movies.length !== 0
    );
  }
}
