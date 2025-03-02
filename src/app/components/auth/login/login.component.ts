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
  errorMessage: string | null = '';

  // Injecting the auth service to make api calls through service layer
  constructor(private authService: AuthService, private router: Router) {}

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    this.authService
      .loginUser(this.userInput.username, this.userInput.password)
      .subscribe({
        next: (response) => {
          console.log(response);

          alert('Login Successfull!! Redirecting to the Todo Page......');
          this.router.navigate(['/']);
        },
        error: () =>
          (this.errorMessage = 'Login Failed!! Please Try again later .....'),
      });
  }

  // This function is invoked when the user clicks on the go to register page button
  onGoToRegisterClick() {
    this.router.navigate(['/register']);
  }
}
