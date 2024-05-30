import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserActivatorService implements CanActivate{

  isLoggedIn = false;
  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn : boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  canActivate(){
    console.log(this.isLoggedIn)
    if(!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
    return this.isLoggedIn;
	}
}
