import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-memory-calendar',
  templateUrl: './memory-calendar.component.html',
  styleUrls: ['./memory-calendar.component.css']
})
export class MemoryCalendarComponent implements OnInit {
  @Input() selectedDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
