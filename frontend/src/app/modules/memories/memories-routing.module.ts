import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMemoryPageComponent } from './pages/create-memory-page/create-memory-page.component';

const routes: Routes = [
  { path: 'create', component: CreateMemoryPageComponent},
  { path: '', redirectTo: 'create', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemoriesRoutingModule { }
