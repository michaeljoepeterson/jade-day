import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Memory } from '../../../../models/memories/memory';
import { MemoryService } from '../../services/memory.service';

@Component({
  selector: 'app-create-memory-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-memory-page.component.html',
  styleUrls: ['./create-memory-page.component.css']
})
export class CreateMemoryPageComponent implements OnInit {
  memories$: Observable<Memory[]>;

  constructor(
    private memoryService: MemoryService
  ) { }

  ngOnInit(): void {
    this.memories$ = this.memoryService.memories$;
    this.getMemories();
  }

  handleDayClicked(date: Date){
    console.log('date', date);
  }

  getMemories(){
    this.memoryService.getMemories().subscribe(res => res);
  }
}
