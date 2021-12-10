import { Component, OnInit } from '@angular/core';
import { Carrito } from '../beans/carrito';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  lstCarrito: Carrito[] = [];
  jsonCarrito: any = "";

  subtotal: string = "";
  tax: string = "";
  total: string = "";
  moneda: string = "PEN";

  
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("lstCarrito") != null){
      this.jsonCarrito = JSON.parse(localStorage.getItem("lstCarrito") || '{}');
    }

    this.CargarTotales();
  }

  CargarTotales(){
    var _sub: number = 0;
    for (let key in this.jsonCarrito) {
      let value = this.jsonCarrito[key];
      _sub += Number(value["precio"]) * Number(value["cantidad"]) ;
    } 
    var _tax = _sub * 0.18;
    var _total = _sub + _tax;

    this.subtotal = _sub.toFixed(2);
    this.tax = _tax.toFixed(2);
    this.total = _total.toFixed(2);
  }

}
