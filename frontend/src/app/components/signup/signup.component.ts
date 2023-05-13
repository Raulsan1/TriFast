import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor (private authService: AuthService, private router: Router) { }

  usuario = {
    nombre: "",
    email: "",
    password: ""
  }

  signUp(){
    this.authService.signUp(this.usuario)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res);
          this.router.navigate(['/principal']);
        },
        err => {
          console.log(err);
        }
      );
  }
}
