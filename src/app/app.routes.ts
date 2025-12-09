import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { HabitList } from './habits/habit-list/habit-list';
import { HabitDetails } from './habits/habit-details/habit-details';
import { HabitCreate } from './habits/habit-create/habit-create';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { HabitEdit } from './habits/habit-edit/habit-edit';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'habits', component: HabitList },
      { path: 'habits/new', component: HabitCreate },
      { path: 'habits/:id', component: HabitDetails },
      { path: 'habits/:id/edit', component: HabitEdit }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }