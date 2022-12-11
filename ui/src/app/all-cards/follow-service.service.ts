import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MakeFollowingServiceService {

  constructor(private http: HttpClient) {
  }

  // follow
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
      result = 'https://127.0.0.1:5011/follow';
    }
    return result;
  }

  insertNewFollowing(userid, followingid): Observable<any> {
    console.log("add following here", userid, followingid)
    let theUrl: string;

    theUrl = this.getInsertNewServiceUrl();
    console.log(theUrl);
    const result = this.http.post(theUrl, {'userid': userid, 'followingid': followingid});
    console.log(result)

    return result;
  }

  // Unfollow
  getDeleteNewServiceUrl(): string {
    const theUrl = window.location.href;
    let result: string;

    // This is some seriously bad code.
    // If you do this on a job interview, you did not learn this in my class.
    if (theUrl.includes('amazonaws')) {
      /* This can change over time */
      result = undefined;
    }
    else {
      result = 'https://127.0.0.1:5011/unfollow';
    }
    return result;
  }

  deleteAndUnfollow(userid, followingid): Observable<any> {
    console.log("Unfollow here", userid, followingid)
    let theUrl: string;

    theUrl = this.getDeleteNewServiceUrl();
    console.log(theUrl);
    const result = this.http.post(theUrl, {'userid': userid, 'followingid': followingid});
    console.log(result)

    return result;
  }
}
