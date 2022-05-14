import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MemoryService } from '../../../../modules/memories/services/memory.service';
import { Memory } from '../../../../models/memories/memory';

@Component({
  selector: 'app-memory-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-calendar.component.html',
  styleUrls: ['./memory-calendar.component.css']
})
export class MemoryCalendarComponent implements OnInit, OnChanges {
  @Input() selectedDate: Date = new Date();
  @Input() memories: Memory[] = [];

  @Output() dayClicked: EventEmitter<Date> = new EventEmitter();

  memoryEvents: CalendarEvent[] = [];

  constructor(
    private memoryService: MemoryService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges: SimpleChanges){
    if(simpleChanges?.['memories']?.currentValue){
      this.memoryEvents = this.memoryService.memoryEventsToCalendarEvents(this.memories);
    }
  }

  handleDayClicked(event: any){
    const {day} = event;
    const {date} = day;
    this.dayClicked.next(new Date(date));
  }

  
}
