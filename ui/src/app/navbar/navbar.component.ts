import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {NavbarServiceService} from "./navbar-service.service";
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
  searchId: string;

  constructor(private router: Router, private http: HttpClient,
              private NavbarService: NavbarServiceService) {
  }

  ngOnInit(): void {
    // this.currentPage = 'Home';
    // console.log('NavbarComponent: OnInit called.');
    // TODO: store userId in localStorage after login
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
  }

  onClickUpdateUserId(): void {
    this.userId = localStorage.getItem('userId');
  }

  Search(): void {
    if (this.searchId.length > 3) {
      console.log(this.searchId);
    }
    this.NavbarService.getSearch(this.searchId)
      .subscribe((data) => this.checkUser(data),
        ((err:Error)=>{
          let col=document.getElementById("SearchBtn");
          col.style.color="#FF0000";
          col.style.border="#FF0000";
        }))
  }

  checkUser(data): void {
    if (data.UserID == this.searchId) {
      window.location.href = 'http://localhost:4200/all-posts/' + this.searchId;
    }
  }

}
