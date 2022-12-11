import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostRsp} from "./post";
import {CommentRsp} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class PostPageService {

  commentPath = 'http://127.0.0.1:5012/comment';
  postPath = 'http://social-media-post.us-east-2.elasticbeanstalk.com/post/';

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

