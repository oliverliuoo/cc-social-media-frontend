import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {appProperties} from "../app.config";


@Injectable({
  providedIn: 'root'
})
export class MakeFollowingServiceService {

  constructor(private http: HttpClient) {
  }

  // follow
  getInsertNewServiceUrl(): string {
    return appProperties.userServiceEndPoint + 'follow';
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
    return appProperties.userServiceEndPoint + 'unfollow';
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
