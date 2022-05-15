import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Memory } from '../../../../models/memories/memory';
//@ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { INewMemory } from 'src/app/models/memories/new-memory';

@Component({
  selector: 'app-memory-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-form.component.html',
  styleUrls: ['./memory-form.component.css']
})
export class MemoryFormComponent implements OnInit {
  @Input() memory: Memory;

  Editor = ClassicEditor;
  isEditing: boolean = false;
  newMemory: INewMemory;
  formData: FormData;

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isEditing = this.memory ? false : true;
    this.buildNewMemory();
  }

  buildNewMemory(){
    this.newMemory = {
      summary: this.memory?.summary,
      description: this.memory?.description,
      date: this.memory?.date,
      image: null,
      creator: 'test'
    };
  }

  toggleEditing(){
    this.isEditing = !this.isEditing;
  }
  /**
   * capture form data for sending to service to upload image
   * @param formData
   */
  imageAdded(formData: FormData){
    console.log(formData.getAll('file'));
    this.formData = formData;
  }

  removeImage(){
    if(this.memory.image){
      //handle delete image
    }

    this.memory.image = null;
    this.newMemory.image = null;
    this.formData = null;
    this.ref.markForCheck();
    console.log('remove image');
  }

  saveMemory(){
    console.log(this.newMemory);
  }
}
