import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';

import { ChangePasswordComponent } from './access/change-password/change-password.component';
import { ProductComponent } from './maintenance/product/product.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PagoComponent } from './pago/pago.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ProductComponent,
    ContactComponent,
    HomeComponent,
    TiendaComponent,
    CarritoComponent,
    PagoComponent,
    ComplaintsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
