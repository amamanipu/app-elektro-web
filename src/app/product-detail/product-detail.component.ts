import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Carrito } from '../beans/carrito';
import { Producto } from '../beans/producto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  //template: '<div [innerHTML]="htmlSize"></div>',
  //encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent implements OnInit {

  stringJson: any;
  stringObject: any;
  dataProducto: any;
  dataImg: any;
  dataFilterSize: any;
  dataFilterColor: any;

  radioSelected: any;

  id: string = "";
  myParam: string = "";
  
  producto: Producto = new Producto();
  activePillIndex:number = 0;
  lstCarrito: Carrito[] = [];
  jsonCarrito: any;

  htmlSize: string = "";

  selectedItems = {};

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
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

    this.id = this.route.snapshot.paramMap.get('id') || "";
    //alert(this.id);

    this.httpClient.get("assets/data.json").subscribe(res =>{

      this.stringJson = JSON.stringify(res);
      this.stringObject = JSON.parse(this.stringJson);
      this.dataProducto = this.stringObject.products;

      this.dataFilterSize = this.stringObject.filters[0].size;
      this.dataFilterColor = this.stringObject.filters[0].color;

      console.log(this.dataFilterColor);
      //this.crearHtmlSize();

      for (let key in this.dataProducto) {
        let value = this.dataProducto[key];
        if(value["id"] == this.id){
          let index = this.dataProducto.indexOf(value);
          this.producto.id = value["id"];
          this.producto.nombre = value["nombre"];
          this.producto.stars = value["stars"];
          this.producto.precio = value["precio"];
          this.producto.moneda = value["moneda"];
          this.producto.img = value["img"];
          this.producto.imgs = value["imgs"];
          this.dataImg = value["imgs"];         

          console.log(this.producto);
          return;

        }
        
      }  
      //console.log(this.dataProducto);
    });

  }

  ProductoDetalle(pid: number){
    this.router.navigate(['/product-detail', pid]); 
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

  
  /* crearHtmlSize(){
    for (let item of this.dataFilterSize) {
      this.htmlSize += "<label for='"+item.tag+"' id='lblSize_"+item.id+"' (click)='toggleHighlight(1)' [ngClass]='{'active': highlightedDiv === 1}>" + item.tag;
      this.htmlSize += "<input type='radio' name='size-'" + item.id + "' id='ipt_" + item.id + "'>";
      this.htmlSize += "</label>";
    }
    return this.htmlSize;
  } */

  highlightedDiv: number = 0;
  toggleHighlight(newValue: number) {
    alert(newValue)
    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
  }

  /* btnSize(idLabel: number){
    //var qty = Number((<HTMLInputElement>document.getElementById("qty"+lin)).value);
    alert(idLabel);
    var elems = document.getElementsByClassName(".product__details__option__size label"); //.removeClass('active');
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    document.getElementById("lblSize_" + idLabel)?.classList.add('active');
  } */

}
