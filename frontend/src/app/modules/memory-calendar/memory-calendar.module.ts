import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryCalendarComponent } from './components/memory-calendar/memory-calendar.component';
import { CalendarMonthModule } from 'angular-calendar';



@NgModule({
  declarations: [
    MemoryCalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarMonthModule
  ],
  exports:[
    MemoryCalendarComponent
  ]
})
export class MemoryCalendarModule { }
