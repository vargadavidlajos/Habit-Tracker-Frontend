import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Completion {
  id: number;
  dateOfCompletion: string;
  habitId: number;
}

@Injectable({ providedIn: 'root' })
export class CompletionService {
  private baseUrl = 'http://localhost:8080/habits'; // base habits URL

  constructor(private http: HttpClient) {}

  getCompletions(habitId: number): Observable<Completion[]> {
    return this.http.get<Completion[]>(`${this.baseUrl}/${habitId}/completions`);
  }

  markCompleted(habitId: number): Observable<Completion> {
    return this.http.post<Completion>(`${this.baseUrl}/${habitId}/completions`, {});
  }
}