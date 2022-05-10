import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn?: Observable<any>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn;
    this.authService.isLoggedIn.subscribe(res => console.log('nav',res))
  }

  openLoginModal(){
    this.authService.openAuthModal();
  }

  async logout(){
    await this.authService.logout();
  }
}
