import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Seguimiento } from 'src/app/models/seguimiento';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { SeguimientosService } from 'src/app/services/seguimientos.service';

@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.css']
})
export class SeguimientosComponent implements OnInit{

  seguimientos: Seguimiento [] = [];
  product: Product = new Product();
  products: Product[] = [];
  showAlert: boolean = false;

  constructor (private seguimientosService: SeguimientosService, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    
    this.seguimientos = [];
    this.product = new Product();
    this.products = [];

    this.seguimientosService.getFollows().subscribe(res => {
      this.seguimientos = res as any;
      this.seguimientos.forEach(seguimiento =>{
        this.productService.getProductById(seguimiento.id_producto).subscribe(res => {
          this.products.push(res as Product);
        });
      });
    });

  }

  stopFollow (id_producto: string){
    this.seguimientosService.deleteFollow(id_producto).subscribe(res => {
      let mensaje = res as any;
      if(mensaje.bool){
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        },2000);
        this.ngOnInit();
      }
    });
  }

}
