import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  password_confirmation: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  onSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };
    this.authService.register(user).subscribe({
      next:() => {
        this.router.navigate(['/login']);
        this.toastr.success('Signed up successfully', 'Success', { progressBar: true, positionClass: 'toast-bottom-right' });
      },
      error: (error) => {
        this.errorMessage = error.error.message
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
