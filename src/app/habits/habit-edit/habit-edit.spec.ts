import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitEdit } from './habit-edit';

describe('HabitEdit', () => {
  let component: HabitEdit;
  let fixture: ComponentFixture<HabitEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
