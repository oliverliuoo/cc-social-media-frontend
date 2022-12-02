import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css']
})
export class AllCardsComponent implements OnInit {
  userId: string;
  postDataList: Array<any> = [];
  postUrl: string;
  // postUrl = 'http://127.0.0.1:5000/post/hl3518/user';
  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('user_id')
    console.log(this.userId);
    this.postUrl = 'http://social-media-post.us-east-2.elasticbeanstalk.com/post/' + this.userId + '/user';
    // fetch data from backend db
    this.http.get(this.postUrl).subscribe((rsp: any) => {
      for (const record of rsp.data) {
        this.postDataList.push(record);
      }
    });
  }
}
