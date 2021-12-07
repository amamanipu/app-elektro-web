import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  stringJson: any;
  stringObject: any;
  dataMenu: any;
  htmlMenu: string = "";

  constructor(private router: Router, private httpClient: HttpClient) {

  }

  ngOnInit() {
      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              const node = document.createElement('script');
              node.src = 'assets/js/main.js';
              node.type = 'text/javascript';
              node.async = false;
              node.id = 'main_js';
              node.charset = 'utf-8';
              document.getElementsByTagName('head')[0].appendChild(node);
          }
      });

      this.httpClient.get("assets/data.json").subscribe(res =>{
        this.stringJson = JSON.stringify(res);
        this.stringObject = JSON.parse(this.stringJson);
        this.dataMenu = this.stringObject.menu;
        this.CrearMenu();
      });
    
  }
  
  CrearMenu() {
    this.htmlMenu = this.MenuRecursivo(this.dataMenu);
  }

  MenuRecursivo(menu: any) {
    var html = "";
    if(menu != null){
      for (let item of menu) {
        var opcionHijos = item.submenu;
        html += "<li>";
        html += "<a href='"+ item.routerLink +"' [routerLink]='["+ item.routerLink +"]'>"+item.nombre+"</a>";
        if (opcionHijos != null) {
          html += "<ul class='dropdown'>";
          html += this.MenuRecursivo(opcionHijos);
          html += "</ul>";
        }
        html += "</li>"
      }
    }
    return html;
  }

  
}
