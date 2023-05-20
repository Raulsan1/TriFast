import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { HistorialService } from 'src/app/services/historial.service';
import { ProductService } from 'src/app/services/product.service';
import { SeguimientosService } from 'src/app/services/seguimientos.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: string = '';
  product: Product = new Product();

  constructor (private productService: ProductService, private route: ActivatedRoute, private authService: AuthService, private router: Router, private seguimientoService: SeguimientosService, private historialService: HistorialService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.productService.getProductById(this.id)
        .subscribe(
          res => {
            this.product = res as Product;
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  followProduct (){

    if(!this.authService.loggedIn()){
      this.router.navigate(['/login']);
    }else{
      let seguimiento = {
        id_producto: this.id,
        token: this.authService.getToken()
      }
      this.seguimientoService.postFollow(seguimiento)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
      );
    }
  }

}
