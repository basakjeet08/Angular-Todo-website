import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  // This variable contains the list of todos
  todoList: Todo[] = [];

  // These two denotes the loading and error states for the component
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the todo service
  constructor(private todoService: TodoService) {}

  // Initializing all the todos from the backend
  ngOnInit(): void {
    // Setting the current state to loading
    this.isLoading = true;

    // Starting the api call
    this.todoService.fetchTodos().subscribe({
      // Success state of the api call
      next: (todoList) => {
        this.isLoading = false;
        this.todoList = todoList;
      },

      // Failure state of the api call
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks the edit option
  onEditClick(id: string) {}

  // This function is called when the user hits the toggle todo option
  onStatusToggleClick(todo: Todo) {
    // Setting the current state as loading
    this.isLoading = true;

    // Starting the api call
    this.todoService.toggleTodoStatus(todo).subscribe({
      // Success State
      next: (todoList) => {
        this.isLoading = false;
        this.todoList = todoList;
      },

      // Failure State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when hte delete button is clicked
  onDeleteClick(id: string) {
    // Setting the current state as loading
    this.isLoading = true;

    // Starting the api call
    this.todoService.deleteTodo(id).subscribe({
      // Success State
      next: (todoList) => {
        this.isLoading = false;
        this.todoList = todoList;
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }
}
