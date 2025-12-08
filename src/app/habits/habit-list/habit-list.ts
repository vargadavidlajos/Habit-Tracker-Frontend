import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService, Habit } from '../../services/habit';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h2>Your Habits</h2>
    <ul>
      <li *ngFor="let habit of habits()">
        <a [routerLink]="['/habits', habit.id]">{{ habit.habitName }}</a>
      </li>
    </ul>
  `
})
export class HabitList implements OnInit {
  habits = signal<Habit[]>([]);

  constructor(private habitService: HabitService) {}

  ngOnInit() {
    this.loadHabits();
  }

  loadHabits() {
    this.habitService.getHabits().subscribe({
      next: (data) => this.habits.set(data),
      error: (err) => console.error('Failed to load habits', err)
    });
  }
}
