import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../Models/Todo';
import { catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  // This is the URL to the backend service
  private url = 'http://localhost:8080/todos';

  // Injecting the HTTP Service so we can make the api calls
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  // This function creates a post api call to post the Todo
  addTodo(description: string) {
    return this.http
      .post<Todo>(this.url, {
        description: description,
      })
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  // This function fetches all the todo from the Backend Database
  fetchTodos() {
    return this.http
      .get<Todo[]>(this.url)
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  // This function toggles the completion status of the todo
  toggleTodoStatus(todo: Todo) {
    return this.http
      .put<Todo[]>(this.url, {
        ...todo,
        isCompleted: !todo.isCompleted,
      })
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  // This function deletes the todo
  deleteTodo(id: string) {
    return this.http
      .delete<Todo[]>(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandlerService.handleError));
  }
}
