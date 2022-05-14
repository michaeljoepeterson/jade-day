import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GoogleAuthProvider,getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Auth,connectAuthEmulator,signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { AuthInfo } from '../models/auth/authInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationsService } from '../modules/notifications/services/notifications.service';
import { AuthModalComponent } from '../components/auth-modal/auth-modal.component';
import { User } from '../models/auth/user';
import { ApiResponse } from '../models/serverResponse';

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
        auth.user = response ? response : null;
        let appUser: User|null = auth?.user ? auth.user : null;
        let isLoggedIn = false;
        if(authInfo?.token && authInfo?.email){
          isLoggedIn = true;
        }
        //console.log(auth);
        this._authInfo.next(auth);
        console.log('service',isLoggedIn);
        this._isLoggedIn.next(isLoggedIn);
        this._loggedInUser.next(isLoggedIn ? appUser : null);
      });
    });
  }

  checkAppUser(email: string, token: string): Observable<User>{
    const url = `${environment.url}users/check`;
    const body = {
      user:{
        email
      }
    };
    return this.http.post(url, body).pipe(
      map((response: ApiResponse) => {
        let {user} = response;
        return new User(user);
      })
    );
  }

  /**
   * sign in using email and password auth
   * @param email 
   * @param pass 
   */
   signInEmail(email: string,pass:string){
    return signInWithEmailAndPassword(this.afAuth,email,pass);
  }

  googleSignIn():Promise<any>{
    try{
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
    return createUserWithEmailAndPassword(this.afAuth,email,pass);
  }

  logout():Promise<any>{
    return this.afAuth.signOut();
  }
}
