import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Follower } from './follower';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FollowerServiceService {

  followings: Follower[];
  followingsUrl: string;

  constructor(private http: HttpClient) {
    // console.log('The URL = ' + window.location.href);
    this.followings = undefined;
    this.followingsUrl = this.getFollowingServiceUrl();
  }

  getFollowingServiceUrl(): string {
    const theUrl = window.location.href;
    let result: string;

    // This is some seriously bad code.
    // If you do this on a job interview, you did not learn this in my class.
    if (theUrl.includes('amazonaws')) {
      /* This can change over time */
      result = undefined;
    }
    else {
      result = 'https://127.0.0.1:5011/followers/';
    }
    return result;
  }


  /** GET heroes from the server */
  getFollowings(userID): Observable<Follower> {
    let theUrl: string;

    theUrl = this.followingsUrl + userID;
    console.log('The URL = ' +  theUrl);
    return this.http.get<Follower>(theUrl);
  }
}
