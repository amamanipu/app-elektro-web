import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrito } from '../beans/carrito';
import { GeneralService } from '../services/general.service';
import { OrdenService } from '../services/orden.service';

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

  
  constructor(
    private fb: FormBuilder,
    private readonly os: OrdenService,
    private readonly gs: GeneralService,
    private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("lstCarrito") != null){
      this.jsonCarrito = JSON.parse(localStorage.getItem("lstCarrito") || '{}');
    }

    this.CargarTotales();
  }

  RealizarPedido(){
    var dj = {
      "iD_ORDEN": 0,
      "iD_CLIENTE": 1,
      "feC_REGISTRO": "2021-12-10T20:43:04.458Z",
      "feC_ENTREGA": "2021-12-10T20:43:04.458Z",
      "metodO_PAGO": "",
      "direccioN_ENTREGA": "ABC",
      "referenciA_ENTREGA": "CDE",
      "imP_TOTAL": 118.00,
      "estadO_ORDEN": "string",
      "detalle": [
        {
          "iD_ORDEN": 0,
          "iD_PRODUCTO": 3,
          "cantidad": 2,
          "precio": 30
        },
        {
          "iD_ORDEN": 0,
          "iD_PRODUCTO": 5,
          "cantidad": 2,
          "precio": 30
        }
      ]
    }

    this.__insert(dj)
    /* if(this.productForm.valid) {
      this.productForm.value.id_categoria = parseInt(this.productForm.value.id_categoria);
      this.productForm.value.id_marca = parseInt(this.productForm.value.id_marca);
      this.productForm.value.precio = parseFloat(this.productForm.value.precio);
      this.productForm.value.productoDetalles.forEach((element: any) => {
        element.id_tamano = parseInt(element.id_tamano);
        element.stock = parseInt(element.stock);
      });;
      this.__insert(this.productForm.value)
    } else {
      alert('Formulario no válido');
    } */

  }

  __insert(data: any) {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    }
    console.log(data)
    console.log(token)
    this.os.__be_insert(data, headers).subscribe((rest: any) => {
      if(rest.issuccess){
        alert("Orden creada con ID: " + rest.data.id );
        //this.router.navigate(['home']);
      } else {
        alert(rest.errormessage);
      }
    })
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
