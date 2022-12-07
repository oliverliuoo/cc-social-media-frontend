import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { FollowingServiceService } from './follow-service.service';
import {SignupServiceService} from "../signup-page/signup.service";

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css']
})
export class AllCardsComponent implements OnInit {
  userId: string;
  loginId: string;
  postDataList: Array<any> = [];
  postUrl: string;
  followService: FollowingServiceService;
  // postUrl = 'http://127.0.0.1:5000/post/hl3518/user';
  constructor(private http: HttpClient, private route: ActivatedRoute, followingService: FollowingServiceService) {
    this.followService = followingService;
    this.loginId = localStorage.getItem('userId');
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

  changeToFollowing() {
    const follow_btn = document.getElementById('follow')
    follow_btn.innerText = 'Following';
    follow_btn.style.background = '#cccccc';
    follow_btn.setAttribute('disabled', '');

    const unfollow_btn = document.getElementById('unfollow')
    unfollow_btn.style.display = 'inline';
  }

  unfollow() {
    const follow_btn = document.getElementById('follow')
    follow_btn.innerText = 'Follow';
    follow_btn.style.background = '#007bff';
    follow_btn.removeAttribute('disabled');

    const unfollow_btn = document.getElementById('unfollow')
    unfollow_btn.style.display = 'none';

    const unfollow_txt = document.getElementById('unfollow_text')
    unfollow_txt.innerText = 'Unfollowed ' + this.userId + "!";
  }

  onFollow(): void {
    //this.followService.insertNewFollowing(this.userId, this.loginId)
    this.changeToFollowing()
    console.log(this.userId, this.loginId)
  }

  onUnfollow(): void {
    this.unfollow()
  }
}
