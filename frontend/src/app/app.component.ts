import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  nombre: string = '';

  constructor(public authService: AuthService, private router: Router) {

  }

  searchByName() {
    this.router.navigate(['/producto/'+this.nombre]);
  }
}
