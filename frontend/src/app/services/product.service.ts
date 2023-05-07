import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //selectedProduct: Product;
  //products: Product[];
  readonly URL_API = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) { }

  getProducts (){
    return this.http.get(this.URL_API);
  }

  getProductsByCategory (category: string){
    return this.http.get(this.URL_API+'/categoria/'+category);
  }
}
