import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  products: Product[] = [];
  featuredProducts: Product[] = [];
  products2: Product[] = [];
  categoryProducts: Product[] = [];
  categories: String[] = [];

  constructor (private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductsByDiscount()
      .subscribe( res => {
        this.products = res as Product[];
        this.getRandomFeaturedProducts();
        //console.log(this.featuredProducts);
    });
    this.productService.getProducts()
      .subscribe( res => {
        this.products2 = res as Product[];
        this.products2.forEach(product => {
          this.categories.push(product.categoria);
        });
        this.categories = this.categories.filter((value, index, self) => {
          const lowercaseValue = value.toLowerCase();
          return (
            index === self.findIndex((elem) => elem.toLowerCase() === lowercaseValue)
          );
        });
    });
  }

  getRandomFeaturedProducts(): void {
    const numberOfFeaturedProducts = 4; // Número de productos destacados que muestro

    if (this.products.length <= numberOfFeaturedProducts) {
      this.featuredProducts = this.products;
    } else {
      const randomizedIndexes = [] as any;
      while (randomizedIndexes.length < numberOfFeaturedProducts) {
        const randomIndex = Math.floor(Math.random() * this.products.length);
        if (!randomizedIndexes.includes(randomIndex)) {
          randomizedIndexes.push(randomIndex);
        }
      }
      this.featuredProducts = randomizedIndexes.map((index: number) => this.products[index]);
    }
  }
}
