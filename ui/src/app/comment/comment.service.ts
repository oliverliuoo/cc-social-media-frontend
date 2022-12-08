import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  Comment: Comment[];
  hostName: string;
  // pathGetS3Url: string;
  pathcommentUpload: string;
  pathGenId: string;
  comments: string;

  constructor(private http: HttpClient) {
    // this.hostName = 'http://social-media-post.us-east-2.elasticbeanstalk.com';
     this.hostName = 'http://127.0.0.1:5011';
    // this.pathGetS3Url = '/post/s3url';
     this.pathcommentUpload = '/comment';
     this.pathGenId = '/comment/genid';
  }

  getCommentId(): Promise<string> {
    const url = this.hostName + this.pathGenId;
    return this.http.get(url, {responseType: 'text'}).toPromise();
  }
  getComments(comments): Observable<Array<any>> {
    this.comments = comments;
    const url = this.hostName + '/commentlist/' + this.comments;
    return this.http.get<Array<any>>(url);
  }

  //getS3Url(objectName: string): Promise<string> {
    //const url = this.hostName + this.pathGetS3Url;
    //let queryParams = new HttpParams();
    //queryParams = queryParams.append('object_name', objectName);
    //return this.http.get(url, {params: queryParams, responseType: 'text'}).toPromise();
  //}

  postcomment(data): Promise<string> {
    const url = this.hostName + this.pathcommentUpload;
    return this.http.post(url, data, {responseType: 'text'}).toPromise();
  }

}

