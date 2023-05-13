import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }
  
  usuario = {
    email: "",
    password: ""
  }

  logIn(){
    this.authService.logIn(this.usuario)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res);
          this.router.navigate(['principal']);
        },
        err => {
          console.log(err);
        }
      );
  }
}
