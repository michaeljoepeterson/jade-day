import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemoryPageComponent } from './create-memory-page.component';

describe('CreateMemoryPageComponent', () => {
  let component: CreateMemoryPageComponent;
  let fixture: ComponentFixture<CreateMemoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMemoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
