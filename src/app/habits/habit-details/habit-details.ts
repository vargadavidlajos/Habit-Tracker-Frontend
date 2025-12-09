import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Habit, HabitService } from '../../services/habit';
import { CompletionService } from '../../services/completions';

@Component({
  selector: 'app-habit-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './habit-details.html',
  styleUrls: ['./habit-details.scss']
})
export class HabitDetails implements OnInit {
  trackedDays= 14;

  habitId!: number;
  habit: Habit | null = null;
  completions: Date[] = [];

  streak = 0;
  streakSymbol = '';
  days: string[] = last7DayNames();
  completed: boolean[] = new Array(7).fill(false);

  constructor(
    private habitService: HabitService,
    private route: ActivatedRoute,
    private completionService: CompletionService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const habitId = this.route.snapshot.paramMap.get('id');
    if (habitId) {
      this.habitId = Number(habitId)
      this.loadHabit();
      this.loadCompletionDatesSorted();
    }
  }

  loadHabit() {
    this.habitService.getHabit(this.habitId).subscribe({
      next: habit => {
        this.habit = habit;
        this.cd.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  deleteHabit() {
    this.habitService.deleteHabit(this.habitId).subscribe({
      next: () => this.router.navigate(['/habits']),
      error: (err) => console.error('failed to delete habit', err)
    });
  }

  editHabit() {
    this.router.navigate(['/habits', this.habitId, 'edit']);
  }

  loadCompletionDatesSorted() {
    this.completionService.getCompletions(this.habitId).subscribe({
      next: data => {
        this.completions = data.map(c => parseDateToDay(c.dateOfCompletion));
        this.completions = this.completions.slice().sort((a, b) => b.getTime() - a.getTime());

        this.setRecentCompletions();
        this.calcStreak();

        this.cd.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  setRecentCompletions() {
    let daysAgo = 0;
    let idx = 0;
    while (daysAgo < this.trackedDays) {
      if (!this.completions[idx]) {
        break;
      }
      const past = calcDaysAgo(this.completions[idx]);
      if (past >= this.trackedDays) {
        break;
      }
      this.completed[past] = true;
      idx++;
    }
  }

  calcStreak() {
    let completionIndex = 0;
    let daysAgo = 1;
    while (this.completions[completionIndex]) {
      if (calcDaysAgo(this.completions[completionIndex]) == daysAgo) {
        daysAgo++;
      } else if (calcDaysAgo(this.completions[completionIndex]) > daysAgo) {
        break;
      }
      completionIndex++;
    }
    this.streak = daysAgo - 1;
  }
}

function last7DayNames(): string[] {
  const dayNames: string[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);

    const shortName = pastDate.toLocaleDateString('en-US', { weekday: 'short' });
    dayNames.push(shortName);
  }

  return dayNames;
}

function calcDaysAgo(date: Date): number {
  
  const today = roundToDay(new Date());
  const target = roundToDay(date);

  const diffMs = today.getTime() - target.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
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

function lastNDays(n: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d);
  }

  return dates;
}