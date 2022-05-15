import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() image: string = null;

  @Output() imageAdded: EventEmitter<FormData> = new EventEmitter();
  @Output() removeImage: EventEmitter<any> = new EventEmitter();

  isDraggedOver: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleImageSelected(files: FileList){
    if(files.length > 0){
      const file = files[0];
      const url = URL.createObjectURL(file)
      this.image = url;
      this.handleImageAdded(file);
    }
  }

  handleImageDropped(event: any){
    console.log(event.dataTransfer.items);
    event.preventDefault();
    if(event?.dataTransfer?.items.length > 0){
      try{
        const file = event.dataTransfer.items[0].getAsFile();
        const url = URL.createObjectURL(file)
        this.image = url;
        this.handleImageAdded(file);
      }
      catch(e){
        console.warn(e);
      }
    }
  }

  handleDragOver(event:any){
    event.preventDefault();
    this.isDraggedOver = true
  }

  handleDragOut(){
    this.isDraggedOver = false;
  }

  handleRemoveImage(){
    this.image = null;
    this.removeImage.emit();
  }

  handleImageAdded(file: File){
    const formData = this.buildFormData(file);
    this.imageAdded.emit(formData);
  }

  buildFormData(file: File): FormData{
    const formData = new FormData();
    formData.append('file',file, file.name);
    return formData;
  }
}
