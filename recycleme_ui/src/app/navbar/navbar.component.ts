import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn : boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.logout(token).subscribe(
        response => {
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Logout failed', error);
        }
      );
    }
  }
}
