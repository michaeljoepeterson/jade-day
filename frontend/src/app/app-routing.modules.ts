import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadChildren:() => import('./modules/home/home.module').then(m => m.HomeModule) },
  { 
    path: 'memory', 
    loadChildren:() => import('./modules/memories/memories.module').then(m => m.MemoriesModule),
    canActivate: [LoggedInGuard]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }