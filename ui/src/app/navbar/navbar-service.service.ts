import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {appProperties} from "../app.config";


@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {

  searchUrl: string;

  constructor(private http: HttpClient) {
    // console.log('The URL = ' + window.location.href);
    // this.followings = undefined;
    this.searchUrl = this.getSearchUrl();
  }

  getSearchUrl(): string {
    return appProperties.userServiceEndPoint + 'all-post/';
  }

  /** GET heroes from the server */
  getSearch(userID): Observable<String> {
    let theUrl: string;
    theUrl = this.searchUrl + userID;
    console.log('The URL = ' +  theUrl);
    return this.http.get<String>(theUrl);
  }
}
