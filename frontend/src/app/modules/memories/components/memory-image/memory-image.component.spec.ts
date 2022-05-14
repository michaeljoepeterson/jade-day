import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryImageComponent } from './memory-image.component';

describe('MemoryImageComponent', () => {
  let component: MemoryImageComponent;
  let fixture: ComponentFixture<MemoryImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
