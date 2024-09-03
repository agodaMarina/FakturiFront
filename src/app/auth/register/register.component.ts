import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from '../../Api/models/registration-request';
import { AuthService } from '../../Api/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
    telephone: '',
  };
  errorMsg: Array<string> = [];

  constructor(private service: AuthService, private router: Router) {}

  register() {
    this.errorMsg = [];
    this.service.register(this.registerRequest).subscribe({
      next: () => {
        this.router.navigate(['/auth/active-account']);
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      },
    });
  }

}
