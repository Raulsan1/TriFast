import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeguimientosService {

  readonly URL_API = 'http://localhost:3000/api/seguimientos';

  constructor(private http: HttpClient) {

   }

  getFollows (){
    return this.http.get(this.URL_API);
  }

  deleteFollow(id_producto: any){
    return this.http.delete(`${this.URL_API}/${id_producto}`);
  }

  postFollow (seguimiento: Object){
    return this.http.post(this.URL_API,seguimiento);
  }


}
