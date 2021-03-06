import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Memory } from '../../../../models/memories/memory';
//@ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { INewMemory } from 'src/app/models/memories/new-memory';
import { MemoryService } from '../../services/memory.service';
import { of, switchMap, tap } from 'rxjs';
import { ImageService } from '../../../../services/image.service';

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

  constructor(
    private ref: ChangeDetectorRef,
    private memoryService: MemoryService
  ) { }

  ngOnInit(): void {
    this.isEditing = this.memory?.id ? false : true;
    this.buildNewMemory();
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
    this.memoryService.createMemory(this.newMemory, this.imageFile).pipe(
      tap(res => this.isLoading = false)
    ).subscribe(res => this.memoryCreated.emit());
  }
}
