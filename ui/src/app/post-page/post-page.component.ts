import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {PostPageService} from "./post-page.service";
import {HttpClient} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent {

  @Input() postId: string;
  @Input() authorId: string;
  @Input() authorName: string;
  @Input() imgUrl: string = 'https://social-media-photo-bucket.s3.us-east-2.amazonaws.com/placeholder.png';
  postText: string;
  inputText: string;
  @ViewChild('inputBox') inputBox: ElementRef;
  commentList: Array<Object>;

  constructor(private http: HttpClient,
              private postPageService: PostPageService,
              private routes: ActivatedRoute) {
  }

  ngOnInit(): void {
    // if postId not passed in, get postId using router
    if (this.postId === null) {
      this.postId = this.routes.snapshot.paramMap.get('post_id');
    }
    // get post data
    this.postPageService.getPostByPostId(this.postId).subscribe((postRsp) => {
      let postData = postRsp.data[0];
      this.imgUrl = postData.photo_url;
      this.postText = postData.post_text;
      this.authorId = postData.user_id;
      this.authorName = postData.user_name;
      if (this.authorName === null || undefined) {
        this.authorName = this.authorId;
      }
      // call comment service get comment data
      this.commentList = [{'userName': 'mockUser1', 'comment': 'not so good!!'},
        {'userName': 'mockUser2', 'comment': 'so fucking good!!'}];
    });
  }

  onPostComment(): void {
    this.commentList.push(
      {'userName': localStorage.getItem('userName'), 'comment': this.inputText}
    )
    // get userId and userName
    let userId = localStorage.getItem('userId');
    let userName = localStorage.getItem('userName');
    // form comment data
    let commentData = {
      'userId': userId,
      'userName': userName,
      'postId': this.postId,
      'comment': this.inputText
    }
    // TODO: implement comment service
    this.postPageService.postComment(commentData);
    this.inputBox.nativeElement.value = '';
  }

  onTextBox(event): void {
    this.inputText = event.target.value;
  }

}


