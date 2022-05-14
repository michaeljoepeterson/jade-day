import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoriesRoutingModule } from './memories-routing.module';
import { CreateMemoryPageComponent } from './pages/create-memory-page/create-memory-page.component';
import { MemoryCalendarModule } from '../memory-calendar/memory-calendar.module';
import { MemoryFormComponent } from './components/memory-form/memory-form.component';
import { MemoryFormModalComponent } from './components/memory-form-modal/memory-form-modal.component';


@NgModule({
  declarations: [
    CreateMemoryPageComponent,
    MemoryFormComponent,
    MemoryFormModalComponent
  ],
  imports: [
    CommonModule,
    MemoriesRoutingModule,
    MemoryCalendarModule
  ]
})
export class MemoriesModule { }
