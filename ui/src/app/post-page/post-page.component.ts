import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {PostPageService} from "./post-page.service";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router'
import {appProperties} from "../app.config";
import {DeletePostDialogComponent} from '../delete-post-dialog/delete-post-dialog.component';
import {User} from "../login-page/log";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent {

  @Input() postId: string;
  @Input() authorId: string;
  @Input() authorName: string;
  @Input() imgUrl: string = appProperties.photoPlaceHolderUrl;
  @Input() postTime: string;
  postText: string;
  inputText: string;
  showDelete: boolean;
  @ViewChild('inputBox') inputBox: ElementRef;
  commentList: Array<Object>;

  total_items=2;
  constructor(private http: HttpClient,
              private postPageService: PostPageService,
              private routes: ActivatedRoute,
              private dialogModel: MatDialog) {
  }

  ngOnInit(): void {
    this.commentList = [];
    // if postId not passed in, get postId using router
    if (this.postId === undefined) {
      this.postId = this.routes.snapshot.paramMap.get('post_id');
    }
    // get post data
    this.postPageService.getPostByPostId(this.postId).subscribe((postRsp) => {
      let postData = postRsp.data[0];
      this.imgUrl = postData.photo_url;
      this.postText = postData.post_text;
      this.authorId = postData.user_id;
      // this.authorName = postData.user_name;
      this.postTime = postData.time_stamp;
      // fetch authorName
      this.http.get<User>(appProperties.userServiceEndPoint + 'users/' + this.authorId).subscribe(
        (userData) => {
          this.authorName = userData.Username;
        }
      )
      if (this.authorName === null || undefined) {
        this.authorName = this.authorId;
      }
      if (this.authorId === localStorage.getItem('userId')) {
        // allow owner to delete post
        this.showDelete = true;
      }
      // call comment service get comment data
      // this.commentList = [{'userName': 'mockUser1', 'comment': 'not so good!!'},
      //   {'userName': 'mockUser2', 'comment': 'so fucking good!!'}];
    });
    // get comment list
    this.postPageService.getCommentsByPostId(this.postId).subscribe(commentRsp => {
      for (let comment of commentRsp.data) {
        this.commentList.push({
          'userName': comment.username,
          'comment': comment.text
        })
      }
    });

  }

  onPostComment(): void {
    if (this.inputText === undefined || null || '') {
      return;
    }
    this.commentList.push(
      {'userName': localStorage.getItem('userName'), 'comment': this.inputText}
    );
    // get userId and userName
    let userId = localStorage.getItem('userId');
    let userName = localStorage.getItem('userName');
    // form comment data
    let commentData = {
      'user_id': userId,
      'username': userName,
      'post_id': this.postId,
      'text': this.inputText,
      'poster_id': this.authorId,
    }
    // TODO: implement comment service
    this.postPageService.postComment(commentData).subscribe((rsp) => {
      console.log(rsp);
    });
    this.inputBox.nativeElement.value = '';
  }

  onTextBox(event): void {
    this.inputText = event.target.value;
  }

  openDeleteDialog(): void {
    console.log(this.postId);
    this.dialogModel.open(DeletePostDialogComponent, {
      data: { 'postId': this.postId }
    });
  }

}


