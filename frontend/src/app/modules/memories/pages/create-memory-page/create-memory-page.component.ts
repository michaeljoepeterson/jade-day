import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-memory-page',
  templateUrl: './create-memory-page.component.html',
  styleUrls: ['./create-memory-page.component.css']
})
export class CreateMemoryPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleDayClicked(date: Date){
    console.log('date', date);
  }
}
