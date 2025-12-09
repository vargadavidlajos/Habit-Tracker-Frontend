import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitService } from '../../services/habit';

@Component({
  selector: 'app-habit-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habit-create.html',
  styleUrls: ['./habit-create.scss']
})
export class HabitCreate {

  habitName = '';
  description = '';

  nameError = '';
  allowedName = true;

  descError = '';
  allowedDesc = true;

  constructor(
    private habitService: HabitService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  createHabit() {
    console.log(this.habitName.length);
    console.log(this.description.length);
    this.habitService.createHabit({
      habitName: this.habitName,
      habitDescription: this.description
    }).subscribe({
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