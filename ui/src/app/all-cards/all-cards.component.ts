import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css']
})
export class AllCardsComponent implements OnInit {
  postDataList: Array<any> = [];
  postUrl = 'http://social-media-post.us-east-2.elasticbeanstalk.com/post/hl3518/user';
  // postUrl = 'http://127.0.0.1:5000/post/hl3518/user';
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // fetch data from backend db
    this.http.get(this.postUrl).subscribe((rsp: any) => {
      for (const record of rsp.data) {
        this.postDataList.push(record);
      }
    });
  }
}
