import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMemoryClickedEvent } from '../../../../models/memories/memory-clicked-event';
import { Memory } from '../../../../models/memories/memory';
import { MemoryFormModalComponent } from '../../components/memory-form-modal/memory-form-modal.component';
import { Store } from '@ngrx/store';
import { getMemories } from '../../../../store/memories/actions';
import { selectMemories } from '../../../../store/memories/selectors';

@Component({
  selector: 'app-create-memory-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-memory-page.component.html',
  styleUrls: ['./create-memory-page.component.css']
})
export class CreateMemoryPageComponent implements OnInit {
  memories: Memory[] = [];

  constructor(
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getMemories());
    this.store.select(selectMemories).subscribe(res => {
      this.memories = [...res];
      console.log('new memories',this.memories);
      this.ref.markForCheck();
    });
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
}
