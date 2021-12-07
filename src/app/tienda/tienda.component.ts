import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Carrito } from '../beans/carrito';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  stringJson: any;
  stringObject: any;
  dataFilterCat: any;
  dataFilterPrice: any;
  dataFilterSize: any;
  dataFilterColor: any;
  dataProducto: any;

  lstCarrito: Carrito[] = [];
  jsonCarrito: any;

  constructor(private router: Router, private httpClient: HttpClient) {

  }

  ngOnInit() {
    /* this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            const node = document.createElement('script');
            node.src = 'assets/js/main.js';
            node.type = 'text/javascript';
            node.async = false;
            node.id = 'main_js';
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }); */

    //localStorage.clear();
    if(localStorage.getItem("lstCarrito") != null){
      //console.log(localStorage.getItem("lstCarrito"));
      this.jsonCarrito = JSON.parse(localStorage.getItem("lstCarrito") || "{}");
      for (let key in this.jsonCarrito) {
        let value = this.jsonCarrito[key];
        let car1 = new Carrito();
        car1.idproducto = value["idproducto"];
        car1.nombre = value["nombre"];
        car1.img = value["img"];
        car1.cantidad = value["cantidad"];
        car1.moneda = value["moneda"];
        car1.precio = value["precio"];

        this.lstCarrito.push(car1);
      } 
    }

    this.httpClient.get("assets/data.json").subscribe(res =>{

      this.stringJson = JSON.stringify(res);
      this.stringObject = JSON.parse(this.stringJson);
      this.dataFilterCat = this.stringObject.filters[0].cat;
      this.dataFilterPrice = this.stringObject.filters[0].price;
      this.dataFilterSize = this.stringObject.filters[0].size;
      this.dataFilterColor = this.stringObject.filters[0].color;
      this.dataProducto = this.stringObject.products;

      //console.log(this.dataProducto);
    });
  
  }

  

  AnadirItem(id: number){
    //alert(id);
    //var filtered = JSON.parse(JSON.stringify(this.dataProducto)).filter(x => x.id == id);
    
    let value: any;
    let esRepetido: boolean = false;

    for (let key in this.dataProducto) {
      value = this.dataProducto[key];
      if(value["id"] == id)
        break;
    } 

    this.lstCarrito.forEach( (element) => {
        if(element.idproducto == id){
          let index = this.lstCarrito.indexOf(element);
          //console.log('repeticua');
          console.log(element);

          let car1 = new Carrito();
          car1.idproducto = value["id"];
          car1.nombre = value["nombre"];
          car1.img = value["img"];

          car1.cantidad = element.cantidad + 1;
          car1.moneda = value["moneda"];
          car1.precio = value["precio"];

          this.lstCarrito[index] = car1;
          esRepetido = true;
          return;
        }
    });
    
    if(esRepetido == false){
      let car1 = new Carrito();
      car1.idproducto = value["id"];
      car1.nombre = value["nombre"];
      car1.img = value["img"];
      car1.cantidad = 1;
      car1.moneda = value["moneda"];
      car1.precio = value["precio"];
      this.lstCarrito.push(car1);
    }
    
    localStorage.setItem("lstCarrito", JSON.stringify(this.lstCarrito));
    this.router.navigate(['/carrito']); 
  }

}
