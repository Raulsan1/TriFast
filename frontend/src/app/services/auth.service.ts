import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  readonly URL_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  signUp(usuario: Object){
    return this.http.post<any>(this.URL_API + '/signup', usuario);
  }

  logIn(usuario: Object){
    return this.http.post<any>(this.URL_API + '/login', usuario);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

}
