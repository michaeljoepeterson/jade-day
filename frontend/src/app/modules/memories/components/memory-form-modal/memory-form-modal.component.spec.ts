import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryFormModalComponent } from './memory-form-modal.component';

describe('MemoryFormModalComponent', () => {
  let component: MemoryFormModalComponent;
  let fixture: ComponentFixture<MemoryFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
