import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Habit, HabitService } from '../../services/habit';
import { Completion, CompletionService } from '../../services/completions';

@Component({
  selector: 'app-habit-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="habit() as h; else loading">
      <h2>{{ h.habitName }}</h2>
      <p>ID: {{ this.habitId }}</p>
      <p>Description: {{ h.habitDescription }}</p>
      <h3>Completions</h3>
      <ul>
        <li *ngFor="let c of completions()">{{ c.dateOfCompletion }}</li>
      </ul>
      <button (click)="deleteHabit()">delete habit</button>
    </div>
    <ng-template #loading>
      <p>Loading habit...</p>
    </ng-template>
  `
})
export class HabitDetails implements OnInit {
  habitId!: number;
  habit = signal<Habit | null>(null);
  completions = signal<Completion[]>([]);

  constructor(
    private habitService: HabitService,
    private route: ActivatedRoute,
    private completionService: CompletionService,
    private router: Router
  ) {}

  ngOnInit() {
    const habitId = this.route.snapshot.paramMap.get('id');
    if (habitId) {
      this.habitId = Number(habitId)
      this.loadHabit();
      this.loadCompletions();
    }
  }

  loadHabit() {
    this.habitService.getHabit(this.habitId).subscribe({
      next: habit => this.habit.set(habit),
      error: err => console.error(err)
    });
  }

  deleteHabit() {
    this.habitService.deleteHabit(this.habitId).subscribe({
      next: () => this.router.navigate(['/habits']),
      error: (err) => console.error('failed to delete habit', err)
    });
  }

  loadCompletions() {
    this.completionService.getCompletions(this.habitId).subscribe({
      next: data => this.completions.set(data),
      error: err => console.error(err)
    });
  }
}