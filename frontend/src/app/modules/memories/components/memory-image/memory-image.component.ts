import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-memory-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-image.component.html',
  styleUrls: ['./memory-image.component.css']
})
export class MemoryImageComponent implements OnInit, AfterViewInit {
  @ViewChild('image') imageElement: ElementRef;

  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.image);
  }
  
  ngAfterViewInit(){
    this.imageElement.nativeElement.src = this.image;
  }
}
