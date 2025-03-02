import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // This is the data inputted by the user
  userInput = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  errorMessage: string | null = null;

  // Injecting the auth service so that we can register this user
  constructor(private authService: AuthService, private router: Router) {}

  // This funciton is invoked when the user clicks the Register Button
  onRegisterClick() {
    const name = this.userInput.firstname + ' ' + this.userInput.lastname;

    // Calling the auth service to post this user data and create an account for him
    this.authService
      .registerUser(
        name.trim(),
        this.userInput.username,
        this.userInput.password
      )
      .subscribe({
        next: () => {
          alert('Registration Successful! Redirecting to the Login Page.....');
          this.onGoToLoginClick();
        },
        error: () =>
          (this.errorMessage = 'Registration Failed!! Try Again.....'),
      });
  }

  // This function is invoked when the user clicks the go to login button
  onGoToLoginClick() {
    this.router.navigate(['/login']);
  }
}
