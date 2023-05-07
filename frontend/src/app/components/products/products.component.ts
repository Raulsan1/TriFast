import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  category: string = '';
  
  constructor(private productService: ProductService){ }

  alert = false;

  searchProductsByCategory(form: NgForm){
    if (form.value.category !== ''){
      this.productService.getProductsByCategory(form.value.category)
      .subscribe(res => {
        console.log(res);
      });
    }else{
      this.alert = true; // Mostrar la alerta
      setTimeout(() => {
        this.alert = false; // Ocultar la alerta después de 2 segundos
      }, 2000);
    }
  }
}
