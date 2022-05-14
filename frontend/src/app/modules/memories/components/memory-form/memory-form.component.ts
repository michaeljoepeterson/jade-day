import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Memory } from '../../../../models/memories/memory';

@Component({
  selector: 'app-memory-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-form.component.html',
  styleUrls: ['./memory-form.component.css']
})
export class MemoryFormComponent implements OnInit {
  @Input() memory: Memory

  constructor() { }

  ngOnInit(): void {
  }

}
