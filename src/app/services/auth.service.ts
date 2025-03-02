import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenData } from '../Models/TokenData';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // This is the URL to the backend service
  private url = 'http://localhost:8080';
  private localTokenKey = 'TOKEN';

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

  // This function sends a login api call request to the /login endpoint
  loginUser(username: string, password: string) {
    return this.http.post<TokenData>(`${this.url}/login`, {
      username: username,
      password: password,
    });
  }

  // This function saves the token in the local storage
  saveToken(tokenData: TokenData) {
    localStorage.setItem(this.localTokenKey, JSON.stringify(tokenData));
  }
}
