import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryCalendarComponent } from './components/memory-calendar/memory-calendar.component';
import { CalendarMonthModule } from 'angular-calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthNamePipe } from './pipes/month-name.pipe';


@NgModule({
  declarations: [
    MemoryCalendarComponent,
    MonthNamePipe
  ],
  imports: [
    CommonModule,
    CalendarMonthModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MemoryCalendarComponent
  ]
})
export class MemoryCalendarModule { }
