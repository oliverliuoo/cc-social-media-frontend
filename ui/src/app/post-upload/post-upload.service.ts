import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {appProperties} from "../app.config";


@Injectable({
  providedIn: 'root'
})
export class PostUploadService {
  hostName: string;
  pathGetS3Url: string;
  pathPostUpload: string;
  pathGenId: string;

  constructor(private http: HttpClient) {
    this.hostName = appProperties.postServiceEndPoint;
    // this.hostName = 'http://127.0.0.1:5000';
    this.pathGetS3Url = '/post/s3url';
    this.pathPostUpload = '/post';
    this.pathGenId = '/post/generate_id';
  }

  getPostId(): Promise<any> {
    const url = this.hostName + this.pathGenId;
    return this.http.get(url).toPromise();
  }

  getS3Url(objectName: string): Promise<any> {
    const url = this.hostName + this.pathGetS3Url;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('object_name', objectName);
    return this.http.get(url, {params: queryParams}).toPromise();
  }

  postData(data): Promise<any> {
    const url = this.hostName + this.pathPostUpload;
    return this.http.post(url, data).toPromise();
  }
}
