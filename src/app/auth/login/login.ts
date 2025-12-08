import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthResponse, AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { firstValueFrom, } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <label>Username</label>
      <input [(ngModel)]="username" name="username" required />

      <label>Password</label>
      <input [(ngModel)]="password" name="password" type="password" required />

      <button type="submit">Login</button>
    </form>
  `
})
export class Login {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      const token: AuthResponse = await firstValueFrom(
        this.auth.login({
          username: this.username,
          password: this.password
        })
      );
      console.log('Logged in, token:', token);

      localStorage.setItem('token', token);

      this.router.navigate(['/habits']);
    } catch (err) {
      console.error('Login failed', err);
    }
  }
}
