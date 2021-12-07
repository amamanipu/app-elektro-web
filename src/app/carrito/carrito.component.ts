import { Component, OnInit } from '@angular/core';
import { Carrito } from '../beans/carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  lstCarrito: Carrito[] = [];
  jsonCarrito: any = "";

  subtotal: string = "";
  tax: string = "";
  total: string = "";
  moneda: string = "PEN";

  constructor() { }

  ngOnInit(): void {
    //localStorage.clear();
    if(localStorage.getItem("lstCarrito") != null){
      this.jsonCarrito = JSON.parse(localStorage.getItem("lstCarrito") || '{}');
    }

    this.CargarTotales();

  }

  EliminarFila(idproducto: number){
    for (let key in this.jsonCarrito) {
      let value = this.jsonCarrito[key];
      if(value["idproducto"] == idproducto){
        let index = this.jsonCarrito.indexOf(value);
        if (index > -1) {
          this.jsonCarrito.splice(index, 1);
        }
        localStorage.setItem("lstCarrito", JSON.stringify(this.jsonCarrito));
        this.CargarTotales();
        return;
      }
      
    }  
  }

  CambiarCantidad(lin: number, idproducto: number, ope: string){
  
    console.log(ope);
    var qty = Number((<HTMLInputElement>document.getElementById("qty"+lin)).value);
    //(<HTMLInputElement>document.getElementById("qty"+lin)).value = qty + 1;
    if(ope == "-" && qty == 1)
      return;

    for (let key in this.jsonCarrito) {
      let value = this.jsonCarrito[key];
      if(value["idproducto"] == idproducto){
        let index = this.jsonCarrito.indexOf(value);
        let car1 = new Carrito();
        car1.idproducto = value["idproducto"];
        car1.nombre = value["nombre"];
        car1.img = value["img"];

        if(ope == "+")
          car1.cantidad = qty + 1;
        if(ope == "-")
          car1.cantidad = qty - 1;

        car1.moneda = value["moneda"];
        car1.precio = value["precio"];

        this.jsonCarrito[index] = car1;
        localStorage.setItem("lstCarrito", JSON.stringify(this.jsonCarrito));
        this.CargarTotales();
        return;
      }
      
    }  

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
