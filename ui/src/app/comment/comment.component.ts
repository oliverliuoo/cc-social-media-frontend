// tslint:disable-next-line:max-line-length
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from './comment.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {HttpClient} from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {PostUploadService} from '../post-upload/post-upload.service';
import { CommentModel } from './comment.model';
@Component({selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {


    // tslint:disable-next-line:max-line-length

    constructor( commentService: CommentService,
                 private http: HttpClient,
    ) {
      this.commentService = commentService;
      this.content = '';
      this.imgSrc = this.placeHolderSrc;
      // + 8.4) Bind the ActivatedRoute to a public variable
    }

    commentList: Array<any> = [];
    commentIntel: Array<any> = [];
    postUrl = 'http://127.0.0.1:5011/comment/p0001/post';
    commentUrl = 'http://127.0.0.1:5011/comment/';
    imgSrc: string;
    postUploadService: PostUploadService;
    commentService: CommentService;
    content: string;
    placeHolderSrc = 'https://social-media-photo-bucket.s3.us-east-2.amazonaws.com/placeholder.png';
    commentText: string;
    userId = 'zw2781';
  comment: CommentModel;



    ngOnInit(): void {
      this.http.get(this.postUrl).subscribe((rsp: any) =>  {
          this.commentList.push(rsp);
          let arrofcomment = rsp.comments.split(',');
          for (const com of arrofcomment) {
            this.http.get(this.commentUrl + com).subscribe((respond: any) =>{
              this.commentIntel.push(respond);
            });
          }
      });
    }

  postComment(form: NgForm) {
      // create the comment data object
        const comment = {
        text: form.value.content,
        user_id: this.userId
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








