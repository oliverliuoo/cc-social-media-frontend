import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Following } from './following';
import { Observable } from 'rxjs';
import {appProperties} from "../app.config";


@Injectable({
  providedIn: 'root'
})
export class FollowingServiceService {

  followingsUrl: string;

  constructor(private http: HttpClient) {

    this.followingsUrl = this.getFollowingServiceUrl();
  }

  getFollowingServiceUrl(): string {
    return appProperties.userServiceEndPoint + 'followings/';
  }


  /** GET heroes from the server */
  getFollowings(userID): Observable<Following> {
    let theUrl: string;

    theUrl = this.followingsUrl + userID;
    console.log('The URL = ' +  theUrl);
    return this.http.get<Following>(theUrl);
  }
}
