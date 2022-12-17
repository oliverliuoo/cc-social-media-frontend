import { Component, OnInit } from '@angular/core';
import { Follower } from './follower';
import { FollowerServiceService } from './follower-service.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followingList: Follower[];
  userID: string;
  followingService: FollowerServiceService;
  numberOfFollower: number

  constructor(followingService: FollowerServiceService) {
    this.followingService = followingService;
    this.followingList = [];
    this.userID = '';
    this.numberOfFollower = 0;
  }

  ngOnInit(): void {
    // this.followingService.getFollowings(this.userID)
    //   .subscribe((data) => this.setFollowingList(data));
    this.userID = localStorage.getItem('userId');
    this.followingService.getFollowings(this.userID)
      .subscribe((data) => this.setFollowerList(data));
  }

  setFollowerList(theFollower: Follower): void {
    // for (let i = 0; i < theFollower.length; i++) {
    // @ts-ignore
    for (const item of theFollower) {
      console.log(item);
      const follower = new Follower();
      follower.FollowerID = item.FollowerID;
      follower.UserID = item.UserID;
      this.followingList.push(follower);
      console.log(follower);
      this.numberOfFollower += 1;
    }

    const btn = document.getElementById('show_follower') as HTMLButtonElement | null;
    btn?.setAttribute('disabled', '');
  }

  onLookup(): void {
    this.followingService.getFollowings(this.userID)
      .subscribe((data) => this.setFollowerList(data));

    const txt = document.getElementById('follower_number')
    txt.style.display = 'block';
  }
}
