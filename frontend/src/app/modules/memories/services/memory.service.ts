import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { catchError, forkJoin, from, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { INewMemory } from '../../../models/memories/new-memory';
import { Memory } from '../../../models/memories/memory';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../models/serverResponse';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { ImageService } from '../../../services/image.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private _endpoint: string = 'memory';
  private _memoryCreated: Subject<any> = new Subject();
  memoryCreated$: Observable<any> = this._memoryCreated.asObservable();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private imageService: ImageService,
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

  //todo not return all memories
  getMemories(): Observable<Memory[]>{
    const user = this.authService.getUser();
    const url = `${environment.url}${this._endpoint}/${user.email}`;

    const headers = this.authService.getAuthHeaders();
    const options = {
      headers
    };
    let foundMemories: Memory[] = [];
    return this.http.get(url,options).pipe(
      map((res: ApiResponse)=> {
        const {memories} = res;
        foundMemories = memories.map((memory: any) => new Memory(memory));
        return foundMemories;
      }),
      switchMap((memories: Memory[]) => {
        let requests = memories.map(memory => from(this.imageService.getImage(memory.id)));
        return forkJoin(requests);
      }),
      map(urls => {
        foundMemories.map((memory, i) => {
          if(urls[i]){
            memory.image = urls[i];
          }
        });
        return foundMemories;
      })
    );
  }

  
  buildMemoryLookup(memories: Memory[]): Map<string, Memory>{
    let memoryLookup = new Map();

    for(let memory of memories){
      memoryLookup.set(memory.date.toDateString(), memory);
    }

    return memoryLookup;
  }

  createMemory(memory: INewMemory, imageFile: File): Observable<Memory>{
    const url = `${environment.url}${this._endpoint}`;

    const headers = this.authService.getAuthHeaders();
    const options = {
      headers
    };

    const body = {
      memory
    };
    let newMemory: Memory;
    return this.http.post(url, body, options).pipe(
      map((res: ApiResponse) => {
        newMemory = new Memory(res['memory']);
        return newMemory;
      }),
      switchMap(memory => {
        if(imageFile){
          return this.updateImage(imageFile, memory.id);
        }
        return of(null);
      }),
      switchMap(memory => {
        return from(this.imageService.getImage(newMemory.id));
      }),
      map(url => {
        newMemory.image = url;
        return newMemory;
      }), 
      tap(memory => {
        this._memoryCreated.next(memory);
        this.notificationService.displaySnackBar(`Memory created on ${memory.date.toLocaleDateString()}!`);
      }),
      catchError(err => {
        console.warn(err);
        this.notificationService.displayErrorSnackBar('Error creating memory', err);
        throw err;
      })
    );
  }

  updateImage(file: File, id: string): Observable<Memory>{
    return from(this.imageService.uploadImage(file, id)).pipe(
      map((response) => {
        return new Memory();
      })
    );
  }
}
