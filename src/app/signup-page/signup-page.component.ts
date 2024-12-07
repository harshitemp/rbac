import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone:true,
  imports:[FormsModule,RouterLink],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  fullname: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';

  constructor(private router: Router) {}
  loginWithGoogle() {
    
    this.router.navigate(['/dynamic-permissions']);
  }

  // Facebook Login Handler
  loginWithFacebook() {
   
    this.router.navigate(['/dynamic-permissions']);
  }

  // Handle signup logic
  onSignup() {
    // Here you can add your signup logic, e.g., API calls
    console.log('User Details:', this.fullname, this.email, this.phone, this.password);

    // Redirect to a success page or login page after signup
    this.router.navigate(['/dynamic-permissions']);
  }
}
