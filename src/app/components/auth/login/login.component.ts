import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // This is the input from the user
  userInput = { username: '', password: '' };

  // This denotes the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = '';

  // Injecting the auth service to make api calls through service layer
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    // Setting the loading state
    this.isLoading = true;

    // Making the api call
    this.authService
      .loginUser(this.userInput.username, this.userInput.password)
      .subscribe({
        // Handling the success state
        next: () => {
          this.isLoading = false;
          this.router.navigate(['../todo'], { relativeTo: this.route });
        },

        // Handling the error state
        error: (error: Error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        },
      });
  }

  // This function is invoked when the user clicks on the go to register page button
  onGoToRegisterClick() {
    this.router.navigate(['../register'], { relativeTo: this.route });
  }
}
