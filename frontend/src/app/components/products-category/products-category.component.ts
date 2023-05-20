import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent {

  categoria: string = '';
  productos: Product[] = [];
  productosEbay: Product[] = [];
  productosAmazon: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoria = params['category']; 

      this.productService.getProductsByCategory(this.categoria)
        .subscribe(
          res => {
            this.productos = res as Product[];
            this.productosEbay = this.productos.filter(producto => producto.tienda === "Ebay");
            this.productosAmazon = this.productos.filter(producto => producto.tienda === "Amazon");
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  detalles(id_producto: string){
    this.router.navigate(['/producto/detalles/'+id_producto])
  }
}
