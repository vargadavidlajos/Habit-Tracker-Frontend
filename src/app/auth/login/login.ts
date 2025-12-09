import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthResponse, AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { firstValueFrom, } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username = '';
  password = '';
  loginFailed = false

  constructor(
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef 
  ) {}

  async login() {
    try {
      const token: AuthResponse = await firstValueFrom(
        this.auth.login({
          username: this.username,
          password: this.password
        })
      );
      console.log('Logged in, token:', token);

      sessionStorage.setItem('token', token);

      this.router.navigate(['/habits']);
    } catch (err) {
      this.loginFailed = true;
      console.error('Login failed: ' + this.loginFailed, err);
      this.password = '';
      this.cd.detectChanges();
    }
  }

  toRegistration() {
    this.router.navigate(['/register']);
  }
}
