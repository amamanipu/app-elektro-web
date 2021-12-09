import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './access/change-password/change-password.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './access/login/login.component';
import { ProductComponent } from './maintenance/product/product.component';
import { RegisterComponent } from './access/register/register.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { PagoComponent } from './pago/pago.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { OrdersComponent } from './orders/orders.component';
import { LogoutComponent } from './access/login/logout.component';
import { MyDataComponent } from './access/my-data/my-data.component';
import { CategoryComponent } from './maintenance/category/category.component';
import { BrandComponent } from './maintenance/brand/brand.component';
import { SizeComponent } from './maintenance/size/size.component';
import { UserComponent } from './setting/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'maintenance/product', component: ProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'libro-reclamaciones', component: ComplaintsComponent },
  { path: 'mis-pedidos', component: OrdersComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'my-data', component: MyDataComponent },
  { path: 'maintenance/category', component: CategoryComponent },
  { path: 'maintenance/brand', component: BrandComponent },
  { path: 'maintenance/size', component: SizeComponent },
  { path: 'setting/user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
