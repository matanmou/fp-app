import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IplPreComponent } from './ipl-pre/ipl-pre.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { ShowPredictComponent } from './show-predict/show-predict.component';
const routes = [
    { path: '', component: IplPreComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'news', component: NewsComponent },
    { path: 'show', component: ShowPredictComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map