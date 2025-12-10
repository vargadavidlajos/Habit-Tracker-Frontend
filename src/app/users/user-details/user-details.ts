import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  imports: [FormsModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails implements OnInit{

  userId = 0;

  username = '';

  changingPassword = false;

  constructor (
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {};

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe({
      next: User => {
        this.username = User.username;
        this.userId = User.id;
        this.cd.detectChanges();
      },
      error: err => console.error("Could not retrieve user information", err)
    })
  }

  saveChanges() {
    this.userService.updateUser({
      username: this.username,
      password: ''
    }).subscribe({
      next: data => window.location.href = '/habits',
      error: err => console.error("could not change info", err)
    });
  }

  deleteUser() {
    this.userService.deleteUser().subscribe();
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  }
}
