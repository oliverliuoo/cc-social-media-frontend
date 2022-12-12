import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Follower } from './follower';
import { Observable } from 'rxjs';
import {appProperties} from "../app.config";


@Injectable({
  providedIn: 'root'
})
export class FollowerServiceService {

  followingsUrl: string;

  constructor(private http: HttpClient) {
    this.followingsUrl = this.getFollowingServiceUrl();
  }

  getFollowingServiceUrl(): string {
    return appProperties.userServiceEndPoint + 'follow';
  }


  /** GET heroes from the server */
  getFollowings(userID): Observable<Follower> {
    let theUrl: string;

    theUrl = this.followingsUrl + userID;
    console.log('The URL = ' +  theUrl);
    return this.http.get<Follower>(theUrl);
  }
}
