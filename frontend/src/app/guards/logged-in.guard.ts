import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { delay, filter, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * check if a user is logged in
 */
@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService);
    return this.authService.isLoggedIn.pipe(
      filter(res => res !== null),
      map(response => {
        console.log(response);
        return response ? true : false;
      })
    );
  }
  
}
