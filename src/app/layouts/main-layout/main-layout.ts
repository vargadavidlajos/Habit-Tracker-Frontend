import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayout {
  logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  }
  toCreate() {
    window.location.href = '/habits/new';
  }
}
