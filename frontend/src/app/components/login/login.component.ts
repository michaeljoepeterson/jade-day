import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationsService } from '../../modules/notifications/services/notifications.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  email?: string;
  password?: string;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
  }

  async emailLogin(event: any){
    if(!this.email || !this.password){
      return;
    }
    try{
      let auth = await this.authService.signInEmail(this.email,this.password);
      let token = await auth.user.getIdToken();
      this.loggedIn.emit();
      //this.checkAppUser(auth.user.email,token);
    }
    catch(e: any){
      if(e?.code !== 'auth/popup-closed-by-user'){
        let message = 'Error logging in with goolge';
        console.warn(message,e);
        this.notificationService.displayErrorSnackBar(message,e);
      }
    }
  }

  async loginWithGoogle(){
    try{
      let auth:any = await this.authService.googleSignIn();
      let token = await auth.user.getIdToken();
      this.loggedIn.emit();
      //this.checkAppUser(auth.user.email,token);
    }
    catch(e: any){
      if(e.code !== 'auth/popup-closed-by-user'){
        let message = 'Error logging in with goolge';
        console.warn(message,e);
        this.notificationService.displayErrorSnackBar(message,e);
      }
    }
  }

}
