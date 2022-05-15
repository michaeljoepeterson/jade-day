import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { INewMemory } from '../../../models/memories/new-memory';
import { Memory } from '../../../models/memories/memory';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../models/serverResponse';
import { NotificationsService } from '../../notifications/services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private _memories: BehaviorSubject<Memory[]> = new BehaviorSubject([]);
  memories$: Observable<Memory[]> = this._memories.asObservable();
  private _endpoint: string = 'memory';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private notificationService: NotificationsService
  ) { }

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

  createMemory(memory: INewMemory): Observable<Memory>{
    const url = `${environment.url}${this._endpoint}`;

    const headers = this.authService.getAuthHeaders();
    const options = {
      headers
    };

    const body = {
      memory
    };

    return this.http.post(url, body, options).pipe(
      map((res: ApiResponse) => {
        const memory = new Memory(res['memory']);
        const memories = this._memories.value;
        memories.push(memory);
        console.log(memories);
        this._memories.next(memories);
        return memory;
      }),
      tap(memory => {
        this.notificationService.displaySnackBar(`Memory created on ${memory.date.toLocaleDateString()}!`);
      }),
      catchError(err => {
        console.warn(err);
        this.notificationService.displayErrorSnackBar('Error creating memory', err);
        throw err;
      })
    );
  }

  updateImage(formData: FormData, id: string): Observable<Memory>{
    const url = `${environment.url}${this._endpoint}/image/${id}`;

    const headers = this.authService.getAuthHeaders();
    const options = {
      headers
    };
    
    return this.http.put(url, formData, options).pipe(
      map((response: ApiResponse) => {

        return new Memory();
      })
    )
  }
}
