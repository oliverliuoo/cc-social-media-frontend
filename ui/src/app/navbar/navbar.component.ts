import {Component, Injectable, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

@Injectable(
  {providedIn: 'root'}
)


export class NavbarComponent implements OnInit {

  currentPage: string;
  user: string;

  constructor() {
  }

  ngOnInit(): void {
    // this.currentPage = 'Home';
    // console.log('NavbarComponent: OnInit called.');
    // TODO: set user while login
    this.user = 'hl3518';
  }


}
