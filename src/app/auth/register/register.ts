import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { firstValueFrom, } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  username = '';
  password = '';

  allowedUsername = true;
  usernameError = '';

  allowedPassword = true;
  passwordError = '';

  errorMessages = new Map<string, string[]>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  async register() {
    try {
      await firstValueFrom(this.auth.register({
          username: this.username,
          password: this.password
      }));
      console.log("Registered user: " + this.username + " " + this.password);

      this.router.navigate(['/login']);
    } catch (err: any) {
      console.error('Registration failed', err);

      const passErr = err.error?.errors?.['password']?.[0];
      const nameErr = err.error?.errors?.['username']?.[0];
      if (passErr) {
        this.passwordError = `password ${passErr}`;
      } else {
        this.passwordError = '';
      }
      if (nameErr) {
        this.usernameError = `username ${nameErr}`;
      } else {
        this.usernameError = err.error?.error || '';
      }
      this.allowedPassword = this.passwordError.length == 0;
      this.allowedUsername = this.usernameError.length == 0;
      this.cd.detectChanges();
    }
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}