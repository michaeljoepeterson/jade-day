import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-memory-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-image.component.html',
  styleUrls: ['./memory-image.component.css']
})
export class MemoryImageComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('image') imageElement: ElementRef;

  @Input() image: string;
  @Output() removeImage: EventEmitter<any> = new EventEmitter();

  shouldUpdateImage: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes?.['image']?.currentValue){
      this.shouldUpdateImage = true;
    }
  }
  
  ngAfterViewChecked() {
      if(this.shouldUpdateImage){
        this.updateImage()
      }
  }

  updateImage(){
    this.imageElement.nativeElement.src = this.image;
    this.shouldUpdateImage = false;
  }

  handleRemoveClicked(){
    this.removeImage.emit();
  }
}
