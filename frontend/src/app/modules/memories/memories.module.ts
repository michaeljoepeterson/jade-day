import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoriesRoutingModule } from './memories-routing.module';
import { CreateMemoryPageComponent } from './pages/create-memory-page/create-memory-page.component';


@NgModule({
  declarations: [
    CreateMemoryPageComponent
  ],
  imports: [
    CommonModule,
    MemoriesRoutingModule
  ]
})
export class MemoriesModule { }
