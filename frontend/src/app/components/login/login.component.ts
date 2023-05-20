import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private location: Location) { }
  
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
          this.location.back();
        },
        err => {
          console.log(err);
        }
      );
  }
}
