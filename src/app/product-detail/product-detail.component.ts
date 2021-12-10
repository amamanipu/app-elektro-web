import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../beans/producto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  stringJson: any;
  stringObject: any;
  dataProducto: any;
  dataImg: any;

  id: string = "";
  myParam: string = "";
  
  producto: Producto = new Producto();


  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    //alert(this.id);

    this.httpClient.get("assets/data.json").subscribe(res =>{

      this.stringJson = JSON.stringify(res);
      this.stringObject = JSON.parse(this.stringJson);
      this.dataProducto = this.stringObject.products;

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

}
