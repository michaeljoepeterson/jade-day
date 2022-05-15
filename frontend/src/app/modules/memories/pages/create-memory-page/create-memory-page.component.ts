import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IMemoryClickedEvent } from '../../../../models/memories/memeoryClickedEvent';
import { Memory } from '../../../../models/memories/memory';
import { MemoryFormModalComponent } from '../../components/memory-form-modal/memory-form-modal.component';
import { MemoryService } from '../../services/memory.service';

@Component({
  selector: 'app-create-memory-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-memory-page.component.html',
  styleUrls: ['./create-memory-page.component.css']
})
export class CreateMemoryPageComponent implements OnInit {
  memories: Memory[] = [];

  constructor(
    private memoryService: MemoryService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.memoryService.memories$.subscribe(res => {
      this.memories = [...res];
      this.ref.markForCheck();
    });
    this.getMemories();
  }

  handleDayClicked(event: IMemoryClickedEvent){
    console.log('date', event);
    let {memory, date} = event;
    if(!memory){
      memory = new Memory();
      memory.date = date;
    }
    this.dialog.open(MemoryFormModalComponent, {
      width:'80vw',
      height:'80vh',
      data: memory,
      autoFocus: false
    });
  }

  getMemories(){
    this.memoryService.getMemories().subscribe(res => res);
  }
}
