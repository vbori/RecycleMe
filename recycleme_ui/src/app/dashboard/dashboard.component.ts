import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUser(token).subscribe(
        response => {
          this.user = response;
        },
        error => {
          console.error('Error fetching user details', error);
        }
      );
    }
  }
}
