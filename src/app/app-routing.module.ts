import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './access/change-password/change-password.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './access/login/login.component';
import { ProductComponent } from './access/product/product.component';
import { RegisterComponent } from './access/register/register.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { PagoComponent } from './pago/pago.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { OrdersComponent } from './access/orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'product', component: ProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'libro-reclamaciones', component: ComplaintsComponent },
  { path: 'mis-pedidos', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
