import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, RouterOutlet, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import {HomeComponent} from './home';
import {AboutComponent} from './about';

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <ul>
      <li >
        <a [routerLink]=" ['Home'] ">Home</a>
      </li>
      <li >
        <a [routerLink]=" ['About'] ">About</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/', name: 'Index', component: HomeComponent, useAsDefault: true },
  { path: '/home', name: 'Home', component: HomeComponent },
  { path: '/about', name: 'About', component: AboutComponent }
])
export class App {
}
