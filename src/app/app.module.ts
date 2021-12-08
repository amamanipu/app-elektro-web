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
import { MyDataComponent } from './access/my-data/my-data.component';
import { CategoryComponent } from './maintenance/category/category.component';
import { BrandComponent } from './maintenance/brand/brand.component';
import { SizeComponent } from './maintenance/size/size.component';


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
    OrdersComponent,
    MyDataComponent,
    CategoryComponent,
    BrandComponent,
    SizeComponent
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
