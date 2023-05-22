import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Historial } from 'src/app/models/historial';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { HistorialService } from 'src/app/services/historial.service';
import { ProductService } from 'src/app/services/product.service';
import { SeguimientosService } from 'src/app/services/seguimientos.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef;

  lineChart: Chart | undefined;
  id: string = '';
  product: Product = new Product();
  historial: Historial[] = [];
  precios: number[] = [];
  fechas: Date [] = [];
  showAlert: boolean = false;
  showAlert2: boolean = false;

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

    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.historialService.getProductHistorial(this.id)
        .subscribe(
          res => {
            this.historial = res as any;
            console.log(this.historial);

            this.historial.forEach(registro => {
              // Extraer el precio y eliminar cualquier carácter que no sea un número
              const precioNumerico = parseFloat(registro.precio.replace(/[^0-9.]/g, ''));
              if (!isNaN(precioNumerico)) {
                this.precios.push(precioNumerico);
              }
            
              // Extraer la fecha y agregarla al array de fechas
              this.fechas.push(registro.fecha);
            });
            this.fechas.sort();
            console.log(this.fechas);
            console.log(this.precios);
            this.createLineChart();
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
            let mensaje = res as any;
            console.log(mensaje);
            if(mensaje.bool){
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              },2000);
            }
          },
          err => {
            console.log(err);
            this.showAlert2 = true;
              setTimeout(() => {
                this.showAlert2 = false;
            },2000);
          }
      );
    }
  }
  createLineChart(): void {
    const canvas = this.lineChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.fechas,
          datasets: [
            {
              label: 'Producto '+this.id,
              data: this.precios,
              borderColor: 'black',
              backgroundColor: 'rgba(255,255,0,0.28)'
            },
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

}
