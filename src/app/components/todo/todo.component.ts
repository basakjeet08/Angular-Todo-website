import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  // Injecting the auth service and router for the logout logic
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks logout
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // This function is executed when the user clicks on the add Todo Button
  onAddTodoClick() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
