import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-memory-calendar',
  templateUrl: './memory-calendar.component.html',
  styleUrls: ['./memory-calendar.component.css']
})
export class MemoryCalendarComponent implements OnInit {
  @Input() selectedDate: Date = new Date();

  @Output() dayClicked: EventEmitter<Date> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleDayClicked(event: any){
    const {day} = event;
    const {date} = day;
    this.dayClicked.next(new Date(date));
  }
}
