import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number,
  username: string
}

export interface UserEdit {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  updateUser(userEdit: UserEdit): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}`, userEdit);
  }
  getUserDetails(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}`);
  }
  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}`);
  }
}
