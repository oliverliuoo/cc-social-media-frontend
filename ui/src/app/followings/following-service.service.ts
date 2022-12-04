import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Following } from './following';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FollowingServiceService {

  followings: Following[];
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
      result = 'http://127.0.0.1:5011/followings/';
    }
    return result;
  }


  /** GET heroes from the server */
  getFollowings(userID): Observable<Following> {
    let theUrl: string;

    theUrl = this.followingsUrl + userID;
    console.log('The URL = ' +  theUrl);
    return this.http.get<Following>(theUrl);
  }
}
