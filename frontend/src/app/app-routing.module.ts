import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IplPreComponent } from './ipl-pre/ipl-pre.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { ShowPredictComponent } from './show-predict/show-predict.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotFoundTBComponent } from './not-found-tb/not-found-tb.component';

const routes: Routes = [ 
  { path: '', component: IplPreComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'news', component: NewsComponent},
  { path: 'show', component: ShowPredictComponent},
  { path: 'notFoundTB', component: NotFoundTBComponent},
  { path: '**', component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
