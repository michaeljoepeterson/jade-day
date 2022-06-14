import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MemoryService } from '../../../../modules/memories/services/memory.service';
import { Memory } from '../../../../models/memories/memory';
import { IMemoryClickedEvent } from '../../../../models/memories/memory-clicked-event';

@Component({
  selector: 'app-memory-calendar',
  templateUrl: './memory-calendar.component.html',
  styleUrls: ['./memory-calendar.component.css']
})
export class MemoryCalendarComponent implements OnInit, OnChanges {
  @Input() selectedDate: Date = new Date();
  @Input() memories: Memory[] = [];

  @Output() dayClicked: EventEmitter<IMemoryClickedEvent> = new EventEmitter();

  memoryEvents: CalendarEvent[] = [];
  memoryLookup: Map<string, Memory> = new Map();

  constructor(
    private memoryService: MemoryService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges: SimpleChanges){
    if(simpleChanges?.['memories']?.currentValue){
      this.memoryEvents = this.memoryService.memoryEventsToCalendarEvents(this.memories);
      this.memoryLookup = this.memoryService.buildMemoryLookup(this.memories);
    }
  }

  handleDayClicked(event: any){
    const {day} = event;
    const {date} = day;
    const memory = this.memoryLookup.get(date.toDateString());
    this.dayClicked.next({
      date: new Date(date),
      memory
    });
  }

}
