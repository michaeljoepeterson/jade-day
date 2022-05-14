import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Memory } from '../../../models/memories/memory';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private _memories: BehaviorSubject<Memory[]> = new BehaviorSubject([]);
  memories$: Observable<Memory[]> = this._memories.asObservable();

  constructor() { }

  memoryEventsToCalendarEvents(memories: Memory[]): CalendarEvent[]{
    const memoryEvents: CalendarEvent[] = [];
    memories.forEach(memory => {
      const event: CalendarEvent = {
        start: memory.date,
        title: memory.summary
      };

      memoryEvents.push(event);
    });

    return memoryEvents;
  }

  //todo remove
  randomDay(): Date{
    const max = 11;
    const min = 0;
    const days = Math.floor(Math.random() * (max - min + 1)) + min;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  getMemories(): Observable<Memory[]>{
    const mockMemories: Memory[] = [];

    for(let i = 0;i < 5;i++){
      let memoryData = {
        summary: `Memory ${i}`,
        description: `Description ${i}`,
        date: this.randomDay(),
        id: i
      };

      mockMemories.push(new Memory(memoryData));
    }

    return of(mockMemories).pipe(
      tap(memories => this._memories.next(memories))
    );
  }

  
  buildMemoryLookup(memories: Memory[]): Map<string, Memory>{
    let memoryLookup = new Map();

    for(let memory of memories){
      memoryLookup.set(memory.date.toDateString(), memory);
    }

    return memoryLookup;
  }
}
