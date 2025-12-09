import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Habit, HabitService } from '../../services/habit';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habit-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './habit-edit.html',
  styleUrls: ['./habit-edit.scss'],
})
export class HabitEdit implements OnInit {

  habitId!: number;

  habitName = '';
  description = '';

  nameError = '';
  allowedName = true;

  descError = '';
  allowedDesc = true;

  constructor(
    private habitService: HabitService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const habitId = this.route.snapshot.paramMap.get('id');
    if (habitId) {
      this.habitId = Number(habitId)
      this.loadHabitDetails();
    }
  }

  loadHabitDetails() {
    this.habitService.getHabit(this.habitId).subscribe({
      next: habit => {
        this.habitName = habit.habitName;
        this.description = habit.habitDescription;
        this.cd.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  toHabitDetails() {
    this.router.navigate(['/habits', this.habitId]);
  }

  updateHabit() {
    console.log(this.habitName.length);
    console.log(this.description.length);
    this.habitService.updateHabit({
      habitName: this.habitName,
      habitDescription: this.description
    }, this.habitId).subscribe({
      next: () => this.router.navigate(['/habits']),
      error: (err) => {
        console.error('Habit creation failed', err);

        const passErr = err.error?.errors?.['habitDescription']?.[0];
        const nameErr = err.error?.errors?.['habitName']?.[0];
        if (passErr) {
          this.descError = `description ${passErr}`;
        } else {
          this.descError = '';
        }
        if (nameErr) {
          this.nameError = `name ${nameErr}`;
        } else {
          '';
        }
        this.allowedDesc = this.descError.length == 0;
        this.allowedName = this.nameError.length == 0;
        this.cd.detectChanges();
      }
    });
  }
}
