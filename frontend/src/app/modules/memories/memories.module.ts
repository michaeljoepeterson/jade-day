import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoriesRoutingModule } from './memories-routing.module';
import { CreateMemoryPageComponent } from './pages/create-memory-page/create-memory-page.component';
import { MemoryCalendarModule } from '../memory-calendar/memory-calendar.module';


@NgModule({
  declarations: [
    CreateMemoryPageComponent
  ],
  imports: [
    CommonModule,
    MemoriesRoutingModule,
    MemoryCalendarModule
  ]
})
export class MemoriesModule { }
