import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  password: string;
  username: string;
}

export type AuthResponse = string;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post(`${this.baseUrl}/auth/login`, data, {
      responseType: 'text'
    });
  }

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/registration`, data);
  }
}