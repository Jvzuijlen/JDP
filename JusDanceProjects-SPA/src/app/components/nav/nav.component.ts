import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  sideNavOpened = false;

  constructor() {}

  ngOnInit() {}

  toggleSideNav() {
    this.sideNavOpened = !this.sideNavOpened;
  }
}
