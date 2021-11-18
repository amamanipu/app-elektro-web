import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
      private router: Router
  ) {

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
  }
}
