import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // This is the URL to the backend service
  private url = 'http://localhost:8080';

  // Injecting the HTTP Service so we can make the api calls
  constructor(private readonly http: HttpClient) {}

  // This function sends a post api call to the /register endpoint to register the user
  registerUser(name: string, username: string, password: string) {
    return this.http.post(`${this.url}/register`, {
      name: name,
      username: username,
      password: password,
    });
  }
}
