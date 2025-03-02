import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

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

  // This is the variable for the api call errors
  errorMessage: string | null = null;

  // Injecting the Todo Service
  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked if the submit / edit button is clicked
  onSubmitClick() {
    this.todoService.addTodo(this.taskInput.description).subscribe({
      next: () => {
        // Routing back to the todo details page
        alert('Todo Added Successfully');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => console.log(error),
    });
  }
}
