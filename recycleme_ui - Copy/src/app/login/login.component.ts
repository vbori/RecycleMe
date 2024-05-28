import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private readonly authService: AuthService, private router: Router) { }

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Assuming the token is in the response, save it to localStorage
        localStorage.setItem('authToken', response.data.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
