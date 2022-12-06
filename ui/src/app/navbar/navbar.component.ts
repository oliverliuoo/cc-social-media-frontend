import {Component, Injectable, OnInit} from '@angular/core';

import { Router } from '@angular/router';


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
  userId: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // this.currentPage = 'Home';
    // console.log('NavbarComponent: OnInit called.');
    // TODO: store userId in localStorage after login
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
  }

  onLogOut(): void {
    localStorage.removeItem('userId');
    this.userId = '';
    this.router.navigateByUrl('login');
  }

  onClickAllPosts(): void {
    this.userId = localStorage.getItem('userId');
  }

}
