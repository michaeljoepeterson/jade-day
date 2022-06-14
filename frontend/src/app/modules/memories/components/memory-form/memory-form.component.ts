import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Memory } from '../../../../models/memories/memory';
//@ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { INewMemory } from '../../../../models/memories/new-memory';
import { MemoryService } from '../../services/memory.service';
import { Store } from '@ngrx/store';
import { createMemory } from '../../../../store/memories/actions';
import { selectMemoriesLoading } from 'src/app/store/memories/selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-memory-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-form.component.html',
  styleUrls: ['./memory-form.component.css']
})
export class MemoryFormComponent implements OnInit {
  @Input() memory: Memory;

  @Output() memoryCreated: EventEmitter<any> = new EventEmitter();

  Editor = ClassicEditor;
  isEditing: boolean = false;
  newMemory: INewMemory;
  imageFile: File;
  isLoading: boolean = false;
  onDestroy: Subject<any> = new Subject();

  constructor(
    private ref: ChangeDetectorRef,
    private store: Store,
    private memoryService: MemoryService
  ) { }

  ngOnInit(): void {
    this.store.select(selectMemoriesLoading).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(loading => this.isLoading = loading);
    this.memoryService.memoryCreated$.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(res => this.memoryCreated.emit());
    this.isEditing = this.memory?.id ? false : true;
    this.buildNewMemory();
  }

  ngOnDestroy(){
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  buildNewMemory(){
    this.newMemory = {
      summary: this.memory?.summary,
      description: this.memory?.description,
      date: this.memory?.date,
      image: null,
      creator: null
    };
  }

  toggleEditing(){
    this.isEditing = !this.isEditing;
  }
  /**
   * capture form data for sending to service to upload image
   * @param formData
   */
  imageAdded(file: File){
    this.imageFile = file;
  }

  removeImage(){
    if(this.memory.image){
      //handle delete image
    }

    this.memory.image = null;
    this.newMemory.image = null;
    this.imageFile = null;
    this.ref.markForCheck();
  }

  saveMemory(){
    if(this.isLoading){
      return;
    }
    this.isLoading = true;
    this.store.dispatch(createMemory({
      memory: this.newMemory,
      imageFile: this.imageFile
    }));
    /*
    this.memoryService.createMemory(this.newMemory, this.imageFile).pipe(
      tap(res => this.isLoading = false)
    ).subscribe(res => this.memoryCreated.emit());
    */
  }
}
