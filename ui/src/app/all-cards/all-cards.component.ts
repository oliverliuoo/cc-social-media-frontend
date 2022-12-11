import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { MakeFollowingServiceService } from './follow-service.service';
import { FollowingServiceService } from '../followings/following-service.service';
import { Following } from '../followings/following';
import {User} from "../login-page/log";

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css']
})
export class AllCardsComponent implements OnInit {
  userId: string;
  userName: string;
  loginId: string;
  postDataList: Array<any> = [];
  postUrl: string;
  userUrl: string = "https://127.0.0.1:5011/users/";
  followService: MakeFollowingServiceService;
  showViewingWhom: boolean = true;

  constructor(private http: HttpClient, private route: ActivatedRoute,
              followingService: MakeFollowingServiceService,
              private followingComponent: FollowingServiceService) {
    this.followService = followingService;
    this.loginId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('user_id');
    // this.userId =  localStorage.getItem('userId');
    console.log(this.userId);
    this.postUrl = 'http://social-media-post.us-east-2.elasticbeanstalk.com/post/' + this.userId + '/user';
    // fetch user's post from backend db
    this.http.get(this.postUrl).subscribe((rsp: any) => {
      for (const record of rsp.data) {
        console.log(record);
        this.postDataList.push(record);
      }
    });
    // get this user's info
    this.http.get<User>(this.userUrl + this.userId).subscribe((user) => {
      this.userName = user.Username;
    });
    // do not show follow and unfollow on your on page
    if (this.userId == this.loginId) {
      const follow_btn = document.getElementById('follow')
      follow_btn.style.display = 'none';
      this.showViewingWhom = false;
    }

    this.followingComponent.getFollowings(this.loginId)
      .subscribe((data) => this.setFollowingList(data));
  }

  setFollowingList(theFollowing: Following): void {
    // for (let i = 0; i < theFollowing.length; i++) {
    // @ts-ignore
    for (const item of theFollowing) {
      console.log(item.FollowingID);
      if (item.FollowingID == this.userId) {
        // detected user has been followed
        this.Follow();
        break;
      }
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
