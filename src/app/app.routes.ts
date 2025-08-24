import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/movie-list/movie-list').then((c) => c.MovieList),
  },
];
