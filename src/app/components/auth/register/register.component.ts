import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  // This denotes the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the auth service, router and the route
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This funciton is invoked when the user clicks the Register Button
  onRegisterClick() {
    // Setting the loading state to true
    this.isLoading = true;

    // Computing the fullname together
    const name = this.userInput.firstname + ' ' + this.userInput.lastname;

    // Calling the auth service to post this user data and create an account for him
    this.authService
      .registerUser(
        name.trim(),
        this.userInput.username,
        this.userInput.password
      )
      .subscribe({
        // Handling when the api call is a success
        next: () => {
          this.isLoading = false;
          this.onGoToLoginClick();
        },

        // Handling when the api call throws an error
        error: (error: Error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        },
      });
  }

  // This function is invoked when the user clicks the go to login button
  onGoToLoginClick() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
