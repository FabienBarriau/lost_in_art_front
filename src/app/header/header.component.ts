import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
      this.items = [
          {label: 'Home',  routerLink: ['/home']},
          {label: 'Big wall',  routerLink: ['/big-wall']},
          {label: 'Similarity', routerLink: ['/similarity']},
          // {label: 'Favorites', icon: 'pi pi-fw pi-heart', routerLink: ['/favorites']},
          // {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/profile']},
          // {label: 'About', icon: 'pi pi-fw pi-info', routerLink: ['/about']},
      ];
  }

}
