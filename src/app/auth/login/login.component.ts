import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateRequest } from '../../Api/models/authenticate-request';
import { AuthService } from '../../Api/services/auth.service';
import { TokenService } from '../../Api/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authRequest: AuthenticateRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];
  showModal: boolean = false;

  constructor(
    private router: Router,
    private service: AuthService,
    private tokenService: TokenService,
   
  ) {}

  login() {
    this.errorMsg = [];
    this.service.login(this.authRequest).subscribe({
      next: (res) => {
        if (res.token) {
          this.tokenService.setToken(res.token as string);
          this.router.navigate(['/layout/dashboard']);
        } else {
          this.showModal = true;
          this.errorMsg.push("désolé vous n'avez pas de token");
        }
      },
      error: (err) => {
        
        if (err.error.validationErrors) {
          
          this.errorMsg = err.error.validationErrors;
       
        } else {
          this.errorMsg.push(err.error.error);
        }
      },
    });
  }

  
  closeModal(): void {
    this.showModal = false;
  }

}
