import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitService } from '../../services/habit';

@Component({
  selector: 'app-habit-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Create New Habit</h2>

    <form (ngSubmit)="createHabit()">
      <label>Habit Name</label>
      <input [(ngModel)]="habitName" name="habitName" required>

      <label>Description</label>
      <input [(ngModel)]="description" name="description">

      <button type="submit">Create</button>
    </form>
  `
})
export class HabitCreate {

  habitName = '';
  description = '';

  constructor(
    private habitService: HabitService,
    private router: Router
  ) {}

  createHabit() {
    this.habitService.createHabit({
      habitName: this.habitName,
      habitDescription: this.description
    }).subscribe({
      next: () => this.router.navigate(['/habits']),
      error: (err) => console.error('Habit creation failed', err)
    });
  }
}