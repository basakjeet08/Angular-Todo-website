import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  // This is the user input stored here for the component
  taskInput = {
    id: '',
    description: '',
    isCompleted: false,
  };

  // This function is invoked if the submit / edit button is clicked
  onSubmitClick() {
    console.log(this.taskInput);
  }
}
