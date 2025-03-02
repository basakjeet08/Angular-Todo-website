import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  // This function handles the error from the api calls
  handleError(error: HttpErrorResponse) {
    // Default Error Code
    let errorMessage = 'An unknown error occurred!';

    // Checking if the error is a client side error or a server side
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      errorMessage = `Server Error : ${error.error}`;
    } else if (typeof error.message === 'string') {
      errorMessage = error.message;
    }

    // Logging for debugging reasons
    console.log(errorMessage);

    // Returning the error for the subsequent lower layers to use if needed
    return throwError(() => new Error(errorMessage));
  }
}
