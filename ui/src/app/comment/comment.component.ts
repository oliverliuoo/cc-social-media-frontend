// tslint:disable-next-line:max-line-length
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostPageService } from '../post-page/post-page.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {HttpClient} from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Comment } from './comment';
@Component({selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {

    // tslint:disable-next-line:max-line-length

    constructor( commentService: PostPageService,
                 private http: HttpClient,
    ) {
      this.commentService = commentService;
      this.content = '';
      this.imgSrc = this.placeHolderSrc;
      // + 8.4) Bind the ActivatedRoute to a public variable
    }

    commentList: Array<any> = [];
    commentIntel: Array<any> = [];
    commentUrl = 'http://127.0.0.1:5011/comment/';
    imgSrc: string;
    commentService: PostPageService;
    content: string;
    placeHolderSrc = 'https://social-media-photo-bucket.s3.us-east-2.amazonaws.com/placeholder.png';
    commentText: string;
    userId = 'zw2781';
    post_id = 'd711721f-c2c0-4240-a80e-99b86a7e176b';
  poster_id = 'hl3518';
  username = 'username';
  comment: Comment;



    ngOnInit(): void {
      this.http.get(this.commentUrl+this.post_id).subscribe((rsp: any) =>  {
          this.commentList.push(rsp);
          for (const com of rsp) {
              this.commentIntel.push(com);
            };
      });
    }


  postComment(form: NgForm) {
      // create the comment data object
        const comment = {
          text: form.value.content,
          user_id: this.userId,
          post_id: this.post_id,
          poster_id: this.poster_id,
          username: this.username
        };

      // call the API to post the comment
        this.http.post('http://127.0.0.1:5011/comment', comment).subscribe(
          () => {
            console.log('Comment posted successfully.');
          },
          err => {
            console.error('Error posting comment:', err);
          }
        );
      }

}








