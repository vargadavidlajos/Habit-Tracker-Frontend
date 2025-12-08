import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthResponse, AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { firstValueFrom, } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="register()">
      <label>Username</label>
      <input [(ngModel)]="username" name="username" required />

      <label>Password</label>
      <input [(ngModel)]="password" name="password" type="password" required />

      <button type="submit">Create Account</button>
    </form>
  `
})
export class Register {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    try {
      await firstValueFrom(this.auth.register({
          username: this.username,
          password: this.password
      }));
      console.log("Registered user: " + this.username + " " + this.password);

      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Registration failed', err);
    }
  }
}
