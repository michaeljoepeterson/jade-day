import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GoogleAuthProvider,getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Auth,connectAuthEmulator,signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { AuthInfo } from '../models/auth/authInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationsService } from '../modules/notifications/services/notifications.service';
import { AuthModalComponent } from '../components/auth-modal/auth-modal.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  googleAuthProvider:any;

  private _authInfo: BehaviorSubject<AuthInfo> = new BehaviorSubject({
    token:'loading'
  } as AuthInfo);
  /**
   * track the logged in user
   */
  authInfo: Observable<AuthInfo> = this._authInfo.asObservable();
  private _isLoggedIn: BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(null);
  /**
   * observable to track the logged in state
   */
  isLoggedIn: Observable<boolean|null> = this._isLoggedIn.asObservable();

  private _loggedInUser: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  /**
   * observable to track the logged in state
   */
   loggedInUser: Observable<User|null> = this._loggedInUser.asObservable();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService,
    private afAuth: Auth 
  ) {
    if(!environment.production){
      const auth = getAuth();
      connectAuthEmulator(auth, "http://localhost:9099");
    }
    this.googleAuthProvider = new GoogleAuthProvider();   
    let authInfo: AuthInfo|null = null;
    this.afAuth.onAuthStateChanged(async (user) => {
      let token = null;
      let email = null;
      if(user){
        email = user.email;
        token = await user.getIdToken();
      }
      let auth = {token,email};
      authInfo = auth as AuthInfo;
      of(null).pipe(
        switchMap(res => {
          if(authInfo?.token && authInfo?.email){
            return this.checkAppUser(authInfo.email,authInfo.token);
          }
          else{
            return of(null);
          }
        })
      ).subscribe(response => {
        let auth = this._authInfo.value;
        auth.token = authInfo?.token;
        auth.email = authInfo?.email;
        let appUser: User|null = auth?.user ? auth.user : null;
        let isLoggedIn = false;
        if(authInfo?.token && authInfo?.email){
          isLoggedIn = true;
        }
        //console.log(auth);
        this._authInfo.next(auth);
        this._isLoggedIn.next(isLoggedIn);
        this._loggedInUser.next(isLoggedIn ? appUser : null);
      });
    });
  }

  checkAppUser(email: string, token: string): Observable<any>{
    return of(true);
  }

  /**
   * sign in using email and password auth
   * @param email 
   * @param pass 
   */
   signInEmail(email: string,pass:string){
    //return this.afAuth.signInWithEmailAndPassword(email,pass);
    return signInWithEmailAndPassword(this.afAuth,email,pass);
  }

  googleSignIn():Promise<any>{
    try{
      //return this.afAuth.signInWithPopup(this.googleAuthProvider);
      return signInWithPopup(this.afAuth,this.googleAuthProvider);
    }
    catch(e){
      throw e;
    }
  }

  openAuthModal(){
    this.notificationService.openModal(AuthModalComponent);
  }

  createUserEmail(email:string,pass:string):Promise<any>{
    //return this.afAuth.createUserWithEmailAndPassword(email,pass)
    return createUserWithEmailAndPassword(this.afAuth,email,pass);
  }

  logout():Promise<any>{
    return this.afAuth.signOut();
  }
}
