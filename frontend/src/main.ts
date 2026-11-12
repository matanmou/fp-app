import { bootstrapApplication } from '@angular/platform-browser';
import { setTheme } from 'ngx-bootstrap/utils';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// The site is styled with Bootstrap 4 (RTL) – tell ngx-bootstrap to render BS4 markup.
setTheme('bs4');

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
