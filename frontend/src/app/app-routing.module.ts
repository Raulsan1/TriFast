import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SeguimientosComponent } from './components/seguimientos/seguimientos.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'principal', component: PrincipalComponent},
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
