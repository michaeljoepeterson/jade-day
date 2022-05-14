import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryCalendarComponent } from './memory-calendar.component';

describe('MemoryCalendarComponent', () => {
  let component: MemoryCalendarComponent;
  let fixture: ComponentFixture<MemoryCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
