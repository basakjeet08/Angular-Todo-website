import { Component } from '@angular/core';

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

  // This funciton is invoked when the user clicks the Register Button
  onRegisterClick() {
    alert(this.userInput);
  }

  // This function is invoked when the user clicks the go to login button
  onGoToLoginClick() {
    alert('Go to Login Clicked');
  }
}
