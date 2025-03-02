import { Component } from '@angular/core';

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

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    alert(this.userInput.username + ' ' + this.userInput.password);
  }

  // This function is invoked when the user clicks on the go to register page button
  onGoToRegisterClick() {
    alert('Go To Register Page Click');
  }
}
