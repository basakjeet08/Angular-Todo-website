import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// This function checks if the user is logged in or not and let the user view the page based on it
export const authGuard: CanActivateFn = () => {
  // Injecting the required auth service and router
  const authService = inject(AuthService);
  const router = inject(Router);

  // Checking if the user is logged in or not
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
