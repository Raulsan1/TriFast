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

  showAlert: boolean = false;
  message: string = '';

  usuario = {
    nombre: "",
    email: "",
    password: ""
  }

  signUp(){

    const regex = /^[a-zA-Z0-9_.+-]+@gmail\.com$/;

    if(regex.test(this.usuario.email)){
      this.authService.signUp(this.usuario)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res);
          this.router.navigate(['/principal']);
        },
        err => {
          console.log(err);
          this.showAlert = true;
          this.message = err.error.mensaje;
            setTimeout(() => {
              this.showAlert = false;
              this.message = '';
          },2000);
        }
      );
    }else{
      this.showAlert = true;
      this.message = 'Correo electronico no valido';
        setTimeout(() => {
          this.showAlert = false;
          this.message = '';
      },2000);
    }
    
  }
}
