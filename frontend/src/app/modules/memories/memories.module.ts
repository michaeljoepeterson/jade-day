import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoriesRoutingModule } from './memories-routing.module';
import { CreateMemoryPageComponent } from './pages/create-memory-page/create-memory-page.component';
import { MemoryCalendarModule } from '../memory-calendar/memory-calendar.module';
import { MemoryFormComponent } from './components/memory-form/memory-form.component';
import { MemoryFormModalComponent } from './components/memory-form-modal/memory-form-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MemoryImageComponent } from './components/memory-image/memory-image.component';

@NgModule({
  declarations: [
    CreateMemoryPageComponent,
    MemoryFormComponent,
    MemoryFormModalComponent,
    ImageUploadComponent,
    MemoryImageComponent
  ],
  imports: [
    CommonModule,
    MemoriesRoutingModule,
    MemoryCalendarModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MemoriesModule { }
