import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoOnlyComponent } from './logo-only/logo-only.component';
import { BottomComponent } from './bottom/bottom.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LogoOnlyComponent, BottomComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matanmoDotCom';
}
