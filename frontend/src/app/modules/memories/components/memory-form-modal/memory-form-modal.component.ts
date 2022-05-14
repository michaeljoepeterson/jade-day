import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Memory } from '../../../../models/memories/memory';

@Component({
  selector: 'app-memory-form-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-form-modal.component.html',
  styleUrls: ['./memory-form-modal.component.css']
})
export class MemoryFormModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MemoryFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public memory: Memory,
  ) { }

  ngOnInit(): void {
  }

}
