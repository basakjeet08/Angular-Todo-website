import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../Models/Todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  // This is the URL to the backend service
  private url = 'http://localhost:8080';

  // Injecting the HTTP Service so we can make the api calls
  constructor(private http: HttpClient) {}

  // This function creates a post api call to post the Todo
  addTodo(description: string) {
    return this.http.post<Todo>(`${this.url}/todos`, {
      description: description,
    });
  }

  // This function fetches all the todo from the Backend Database
  fetchTodos() {
    return this.http.get<Todo[]>(`${this.url}/todos`);
  }

  // This function toggles the completion status of the todo
  toggleTodoStatus(todo: Todo) {
    return this.http.put<Todo[]>(`${this.url}/todos`, {
      ...todo,
      isCompleted: !todo.isCompleted,
    });
  }

  // This function deletes the todo
  deleteTodo(id: string) {
    return this.http.delete<Todo[]>(`${this.url}/todos/${id}`);
  }
}
