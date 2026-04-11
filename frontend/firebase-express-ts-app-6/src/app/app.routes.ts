import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home').then((c) => c.Home);
    },
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./login/login').then((c) => c.Login);
    },
  },
  {
    path: 'user-library',
    loadComponent: () => {
      return import('./user-library/user-library').then((c) => c.UserLibrary);
    },
  },
];
