import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {appProperties} from "../app.config";


@Injectable({
  providedIn: 'root'
})
export class EditUsernameService {

  constructor(private http: HttpClient) {
  }

  // Edit username
  getServiceUrl(): string {
    return appProperties.userServiceEndPoint + 'rename';
  }

  editUsername(userid, newName): Observable<any> {
    console.log("Edit username here ", userid, newName)
    let theUrl: string;

    theUrl = this.getServiceUrl();
    console.log(theUrl);
    const result = this.http.post(theUrl, {'userid': userid, 'username': newName});
    console.log(result)

    return result;
  }
}
