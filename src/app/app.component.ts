import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginscreenComponent } from './components/loginscreen/loginscreen.component';
import { MainpanelComponent } from './components/mainpanel/mainpanel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginscreenComponent, MainpanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Client';
}
