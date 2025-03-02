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

  // Injecting the todo service
  constructor(private todoService: TodoService) {}

  // Initializing all the todos from the backend
  ngOnInit(): void {
    this.todoService.fetchTodos().subscribe({
      next: (todoList: Todo[]) => (this.todoList = todoList),
      error: (error) => console.log(error),
    });
  }

  // This function is invoked when the user clicks the edit option
  onEditClick(id: string) {}

  // This function is called when the user hits the toggle todo option
  onStatusToggleClick(todo: Todo) {
    this.todoService.toggleTodoStatus(todo).subscribe({
      next: (todoList) => (this.todoList = todoList),
      error: (error) => console.log(error),
    });
  }

  // This function is invoked when hte delete button is clicked
  onDeleteClick(id: string) {
    this.todoService.deleteTodo(id).subscribe({
      next: (todoList) => (this.todoList = todoList),
      error: (error) => console.log(error),
    });
  }
}
