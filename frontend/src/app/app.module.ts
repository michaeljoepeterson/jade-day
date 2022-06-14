import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth } from 'firebase/auth';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StoreModule } from '@ngrx/store';
import { MemoryReducer } from './store/memories/reducers';
import { EffectsModule } from '@ngrx/effects';
import { MemoryEffects } from './store/memories/effects';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AuthModalComponent,
    CreateAccountComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.fbConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => {
      const firestore = getFirestore();
      return firestore;
    }),
    BrowserAnimationsModule,
    MatInputModule,
    NotificationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    StoreModule.forRoot({
      memoryState: MemoryReducer
    }),
    EffectsModule.forRoot([MemoryEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
