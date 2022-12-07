import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FollowingServiceService {

  constructor(private http: HttpClient) {
  }

  getInsertNewServiceUrl(): string {
    const theUrl = window.location.href;
    let result: string;

    // This is some seriously bad code.
    // If you do this on a job interview, you did not learn this in my class.
    if (theUrl.includes('amazonaws')) {
      /* This can change over time */
      result = undefined;
    }
    else {
      result = 'http://127.0.0.1:5011/new-follower/';
    }
    return result;
  }

  insertNewFollowing(userid, followingid): Observable<any> {
    console.log("insert here")
    let theUrl: string;

    theUrl = this.getInsertNewServiceUrl();
    console.log(theUrl);
    const result = this.http.post(theUrl, {'userid': userid, 'followingid': followingid});

    return result;
  }
}
