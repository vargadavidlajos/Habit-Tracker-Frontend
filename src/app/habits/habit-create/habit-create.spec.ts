import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitCreate } from './habit-create';

describe('HabitCreate', () => {
  let component: HabitCreate;
  let fixture: ComponentFixture<HabitCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
