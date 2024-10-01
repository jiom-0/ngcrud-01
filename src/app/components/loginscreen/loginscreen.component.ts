import { Component, signal} from '@angular/core';
import { AuthService } from '../../main/auth.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-loginscreen',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule, 
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './loginscreen.component.html',
  styleUrl: './loginscreen.component.css'
})
export class LoginscreenComponent { 
  token: string = '';
  authToken: Observable<any>;
  email: string = '';
  senha: string = '';
  errorMessage: string = '';
  exibirComponente: boolean = false;

  hidePasswd = signal(true);
  clickEvent(event: MouseEvent) {
    this.hidePasswd.set(!this.hidePasswd());
    event.stopPropagation();
  }
  constructor(private auth: AuthService) {
    this.authToken = of('ok');
  }

  ngOnInit() {
    this.auth.message$.subscribe(message => {
      this.exibirComponente = (message != 'logado');
    });
    this.exibirComponente = !this.auth.isLoggedIn();
  }

  onLogin(){
    this.authToken = this.auth.login( this.email, this.senha);
    this.authToken.subscribe({
      error: err => {
        if(err.status == 401) this.errorMessage = "Credenciais inválidas"; 
      }
    });
    if(this.auth.isLoggedIn()){
      
    }
  }
}
