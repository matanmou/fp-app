import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IplPreComponent } from './ipl-pre/ipl-pre.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { BottomComponent } from './bottom/bottom.component';
import { TeamListComponent } from './team-list/team-list.component';
import { ModalModule } from 'ngx-bootstrap';
import { LogoOnlyComponent } from './logo-only/logo-only.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TeamsService } from './teams.service';
import { PickService } from './pick.service';
import { ShowPredictComponent } from './show-predict/show-predict.component';
import { FormsModule } from '@angular/forms';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            IplPreComponent,
            MenuComponent,
            HomeComponent,
            NewsComponent,
            BottomComponent,
            TeamListComponent,
            LogoOnlyComponent,
            ShowPredictComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            DragDropModule,
            FormsModule,
            ModalModule.forRoot(),
            HttpClientModule
        ],
        entryComponents: [TeamListComponent],
        providers: [
            TeamsService,
            PickService,
            { provide: 'dbUrl', useValue: environment.webAPI }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map