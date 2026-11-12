import { Routes } from '@angular/router';
import { IplPreComponent } from './ipl-pre/ipl-pre.component';

export const routes: Routes = [
  { path: '', component: IplPreComponent, pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'news', loadComponent: () => import('./news/news.component').then(m => m.NewsComponent) },
  { path: 'show', loadComponent: () => import('./show-predict/show-predict.component').then(m => m.ShowPredictComponent) },
  { path: 'notFoundTB', loadComponent: () => import('./not-found-tb/not-found-tb.component').then(m => m.NotFoundTBComponent) },
  { path: '**', loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent) }
];
