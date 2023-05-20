import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http: HttpClient) { }

  readonly URL_API = 'http://localhost:3000/api/historial';

  getProductHistorial (id_producto: string) {
    this.http.get(this.URL_API+'/producto'+id_producto);
  }

}