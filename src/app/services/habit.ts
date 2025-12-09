import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Habit {
  id: number;
  habitName: string;
  habitDescription: string;
  userId: number;
}

export interface HabitCreateDto {
  habitName: string;
  habitDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private baseUrl = 'http://localhost:8080/habits';

  constructor(private http: HttpClient) {}

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.baseUrl);
  }

  getHabit(habitId: number): Observable<Habit> {
    return this.http.get<Habit>(`${this.baseUrl}/${habitId}`);
  }

  createHabit(habit: HabitCreateDto): Observable<Habit> {
    return this.http.post<Habit>(this.baseUrl, habit);
  }

  updateHabit(habit: HabitCreateDto, id: number): Observable<Habit> {
    return this.http.put<Habit>(`${this.baseUrl}/${id}`, habit);
  }

  deleteHabit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
