import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { FollowingServiceService } from './follow-service.service';
import {SignupServiceService} from "../signup-page/signup.service";
import { FollowingsComponent } from '../followings/followings.component';

@Component({
  providers:[ FollowingsComponent ],
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
  followingComponent: FollowingsComponent;

  // postUrl = 'http://127.0.0.1:5000/post/hl3518/user';
  constructor(private http: HttpClient, private route: ActivatedRoute,
              followingService: FollowingServiceService,
              followingComponent: FollowingsComponent) {
    this.followService = followingService;
    this.loginId = localStorage.getItem('userId');
    this.followingComponent = followingComponent;
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

    if (this.userId == this.loginId) {
      const follow_btn = document.getElementById('follow')
      follow_btn.style.display = 'none';
    }
  }

  Follow() {
    const follow_btn = document.getElementById('follow')
    follow_btn.innerText = 'Following';
    follow_btn.style.background = '#cccccc';
    follow_btn.setAttribute('disabled', '');

    const unfollow_btn = document.getElementById('unfollow')
    unfollow_btn.style.display = 'inline';

    const unfollow_txt = document.getElementById('unfollow_text')
    unfollow_txt.innerText = '';
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
    this.followService.insertNewFollowing(this.loginId, this.userId).subscribe((data) => {console.log(data)});
    this.Follow()
  }

  onUnfollow(): void {
    this.followService.deleteAndUnfollow(this.loginId, this.userId).subscribe((data) => {console.log(data)});
    this.unfollow()
  }
}
