import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from "@angular/router";

import {PostUploadService} from './post-upload.service';


@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
  styleUrls: ['./post-upload.component.css']
})
export class PostUploadComponent implements OnInit {

  constructor(postUploadService: PostUploadService,
              private http: HttpClient,
              private router: Router,
              public dialogRef: MatDialogRef<PostUploadComponent>) {
    this.postUploadService = postUploadService;
    this.postText = '';
    this.imgSrc = this.placeHolderSrc;
  }
  photo: File;
  imgSrc: string;
  postUploadService: PostUploadService;
  postText: string;
  userId: string;
  placeHolderSrc = 'https://social-media-photo-bucket.s3.us-east-2.amazonaws.com/placeholder.png';

  @ViewChild('textBox') textBox: ElementRef;
  @ViewChild('inputFile') inputFile: ElementRef;

  ngOnInit(): void {
  }

  onTextBox(event): void {
    this.postText = event.target.value;
  }

  onFileSelected(event): void{
    this.photo = event.target.files[0];
    // preview selected photo
    const reader = new FileReader();
    reader.readAsDataURL(this.photo);
    reader.onload = () => {
      this.imgSrc = reader.result as string;
    };
  }

  async onUpload(): Promise<void> {
    this.userId = localStorage.getItem('userId');
    if (this.userId === '') {
      alert('please login first.')
      //this.uploadDialog.close();
      await this.router.navigateByUrl('login');
      this.dialogRef.close();
      return;
    }
    if (this.imgSrc === this.placeHolderSrc) {
      alert('please select a photo to post!');
      return;
    }
    // synchronous http request
    // get a new generated post id
    let newPostId = null;
    await this.postUploadService.getPostId().then(value => {
      newPostId = value;
    });
    // get pre-signed s3 put url
    this.postUploadService.getS3Url(newPostId).then(objS3PutUrl => {
      const objS3GetUrl = objS3PutUrl.split('?')[0];
      console.log(objS3GetUrl);
      // post payload
      const postData = {
        user_id: this.userId,
        post_id: newPostId,
        photo_url: objS3GetUrl,
        post_text: this.postText
      };
      // put photo to S3 bucket
      this.http.put(objS3PutUrl, this.photo).subscribe({
        next: data => {
          console.log(data);
          console.log('Successfully upload photo to cloud.');
          // insert record to backend database
          this.postUploadService.postData(postData).then((rsp) => {
            console.log(rsp);
          });
          this.clearUp();
        },
        error: error => {
          console.error('Error met during uploading photo.', error);
          alert('Upload unsuccessful, please try again.');
        }
      });
    });
  }

  clearUp(): void {
    this.inputFile.nativeElement.value = '';
    this.textBox.nativeElement.value = '';
    this.imgSrc = this.placeHolderSrc;
    close();
  }

  onRemovePhoto(): void {
    this.inputFile.nativeElement.value = '';
    this.imgSrc = this.placeHolderSrc;
  }

  close(): void {
    this.dialogRef.close();
  }
}
