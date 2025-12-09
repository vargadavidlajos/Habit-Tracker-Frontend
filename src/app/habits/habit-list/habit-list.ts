import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService, Habit } from '../../services/habit';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CompletionService } from '../../services/completions';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './habit-list.html',
  styleUrls: ['./habit-list.scss']
})
export class HabitList implements OnInit {
  habits = signal<Habit[]>([]);
  completions: boolean[] = [];

  noHabits = false;

  constructor(
    private habitService: HabitService,
    private completionService: CompletionService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadHabits();
  }

  loadHabits() {
    this.habitService.getHabits().subscribe({
      next: (data) => {
        this.habits.set(data);
        if (this.habits().length < 1) {
          this.noHabits = true;
        }
        this.setCompletions();
      },
      error: (err) => console.error('Failed to load habits', err)
    });
  }
  setCompletions() {
    const today = roundToDay(new Date());
    for (let i = 0; i < this.habits().length; i++) {
      let habitId = this.habits()[i].id;
      this.completionService.getCompletions(habitId).subscribe({
        next: completions => {
          let completionTimes = completions.map(c => parseDateToDay(c.dateOfCompletion));
          this.completions[i] = completionTimes.length
          ? new Date(Math.max(...completionTimes.map(d => d.getTime()))).getTime() === today.getTime()
          : false;
          this.cd.detectChanges();
        },
        error: err => console.error("Could not load completion ", err)
      });
    }
  }

  completeHabit(habitId: number, habitNr: number) {
    this.completionService.markCompleted(habitId).subscribe();
    this.completions[habitNr] = true;
  }
}

function parseDateToDay(dateStr: string): Date {
  const date = new Date(dateStr);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function roundToDay(date: Date): Date {
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));
}