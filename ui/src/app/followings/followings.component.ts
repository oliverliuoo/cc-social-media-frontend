import { Component, OnInit } from '@angular/core';
import { Following } from './following';
import { FollowingServiceService } from './following-service.service';

@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.css']
})
export class FollowingsComponent implements OnInit {

  followingList: Following[];
  userID: string;
  followingService: FollowingServiceService;
  numberOfFollowing: number;

  constructor(followingService: FollowingServiceService) {
    this.followingService = followingService;
    this.followingList = [];
    this.userID = '';
    this.numberOfFollowing = 0;
  }

  ngOnInit(): void {
    // this.followingService.getFollowings(this.userID)
    //   .subscribe((data) => this.setFollowingList(data));
    this.userID = localStorage.getItem('userId');
  }

  setFollowingList(theFollowing: Following): void {
    // for (let i = 0; i < theFollowing.length; i++) {
    // @ts-ignore
    for (const item of theFollowing) {
      const following = new Following();
      following.FollowingID = item.FollowingID;
      following.UserID = item.UserID;
      this.followingList.push(following);
      console.log(following);
      this.numberOfFollowing += 1;
    }

    const btn = document.getElementById('show_following') as HTMLButtonElement | null;
    btn?.setAttribute('disabled', '');
  }

  onLookup(): void {
    this.followingService.getFollowings(this.userID)
      .subscribe((data) => this.setFollowingList(data));

    const txt = document.getElementById('following_number')
    txt.style.display = 'block';
  }
}
