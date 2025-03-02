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

  // This is the loading and error state
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the Todo Service
  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked if the submit / edit button is clicked
  onSubmitClick() {
    // Setting the current state to loading state
    this.isLoading = true;

    this.todoService.addTodo(this.taskInput.description).subscribe({
      // Success State
      next: () => {
        this.isLoading = false;
        this.router.navigate(['../'], { relativeTo: this.route });
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }
}
