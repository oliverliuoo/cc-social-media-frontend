import { Component, OnInit } from '@angular/core';
import { Following } from './following';
import { FollowingServiceService } from './following-service.service';

@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.css']
})
export class FollowingsComponent implements OnInit {

  followingList: string[];
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
    this.userID = localStorage.getItem('userId');
    this.followingService.getFollowings(this.userID)
      .subscribe((data) => this.setFollowingList(data));
  }

  setFollowingList(theFollowing: Following): void {
    // for (let i = 0; i < theFollowing.length; i++) {
    // @ts-ignore
    for (const item of theFollowing) {
      this.followingList.push(item.FollowingID);
      this.numberOfFollowing += 1;
    }
  }

  onLookup(): void {
    const btn = document.getElementById('show_following') as HTMLButtonElement | null;
    btn?.setAttribute('disabled', '');

    const table = document.getElementById('following_list')
    table.style.display = 'table';
  }

}
