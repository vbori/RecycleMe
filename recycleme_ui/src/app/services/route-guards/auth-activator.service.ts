import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthActivatorService implements CanActivate{

  isLoggedIn = false;
  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn : boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  canActivate(){ //If user is already logged in, redirect to dashboard
    if(this.isLoggedIn){
      this.router.navigate(['/dashboard']);
    }
    return !this.isLoggedIn;
	}
}
