import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    this.isEditing = this.memory ? false : true;
    this.buildNewMemory();
  }

  buildNewMemory(){
    this.newMemory = {
      summary: this.memory?.summary,
      description: this.memory?.description,
      date: this.memory?.date,
      image: null
    };
  }

  toggleEditing(){
    this.isEditing = !this.isEditing;
  }
}
