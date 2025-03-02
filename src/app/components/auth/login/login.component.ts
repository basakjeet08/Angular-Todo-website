import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // This is the input from the user
  userInput = {
    username: '',
    password: '',
  };

  // Injecting the auth service to make api calls through service layer
  constructor(private authService: AuthService, private router: Router) {}

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    this.authService
      .loginUser(this.userInput.username, this.userInput.password)
      .subscribe({
        next: (response) => {
          console.log(response);

          // Sending the token data back to the service so that it can store it and navigating to the todo screen
          this.authService.saveToken(response);
          this.router.navigate(['/']);
        },
        error: (error: Error) => console.log(error),
      });
  }

  // This function is invoked when the user clicks on the go to register page button
  onGoToRegisterClick() {
    this.router.navigate(['/register']);
  }
}
