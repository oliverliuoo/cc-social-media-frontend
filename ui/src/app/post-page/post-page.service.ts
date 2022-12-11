import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostRsp} from "./post";
import {CommentRsp} from "./comment";
import {appProperties} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class PostPageService {

  commentPath = appProperties.commentServiceEndPoint + 'comment';
  postPath = appProperties.postServiceEndPoint + 'post/';

  constructor(private http: HttpClient) {
  }

  getPostByPostId(postId: string): Observable<PostRsp> {
    return this.http.get<PostRsp>(this.postPath + postId);
  }

  getCommentsByPostId(postId: string): Observable<CommentRsp> {
    return this.http.get<CommentRsp>(this.commentPath + '/' + postId);
  }

  postComment(data): Observable<any>{
    return this.http.post(this.commentPath, data);
  }

}

