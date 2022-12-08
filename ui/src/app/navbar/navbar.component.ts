import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

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

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.currentPage = 'Home';
    // console.log('NavbarComponent: OnInit called.');
    // TODO: store userId in localStorage after login
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
  }

  onLogOut(): void {
    this.http.get('https://127.0.0.1:5011/logout').subscribe((rsp) => {
      localStorage.removeItem('userId');
      this.userId = '';
      this.router.navigateByUrl('login');
    })
  }

  onClickAllPosts(): void {
    this.userId = localStorage.getItem('userId');
  }

}
