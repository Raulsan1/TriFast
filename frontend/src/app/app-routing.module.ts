import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SeguimientosComponent } from './components/seguimientos/seguimientos.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsCategoryComponent } from './components/products-category/products-category.component';
import { PrincipalComponent } from './components/principal/principal.component';


const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'principal', component: PrincipalComponent},
  { path: 'producto/:nombre', component: ProductComponent},
  { path: 'producto/detalles/:id', component: ProductDetailsComponent},
  { path: 'producto/categoria/:category', component: ProductsCategoryComponent},
  { path: 'seguimientos', component: SeguimientosComponent, canActivate: [authGuard]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
