import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteLink } from '../../models/route-link';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navLinks: RouteLink[] = [
    {
      url: '/home',
      name: 'Home'
    },
    {
      url: '/memory',
      name: 'Memories',
      isLoggedIn: true
    }
  ];
  loggedIn?: Observable<any>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn;
  }

  openLoginModal(){
    this.authService.openAuthModal();
  }

  async logout(){
    await this.authService.logout();
  }
}
