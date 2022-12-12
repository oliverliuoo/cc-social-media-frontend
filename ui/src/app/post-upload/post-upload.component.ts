import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialogRef } from '@angular/material/dialog';
import {Router} from "@angular/router";

import {PostUploadService} from './post-upload.service';
import {appProperties} from "../app.config";


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
  placeHolderSrc = appProperties.photoPlaceHolderUrl;

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
    let userId = localStorage.getItem('userId');
    let userName = localStorage.getItem('userName');
    if (userId === '') {
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
      // console.log(objS3GetUrl);
      // post payload
      const postData = {
        user_id: userId,
        user_name: userName,
        post_id: newPostId,
        photo_url: objS3GetUrl,
        post_text: this.postText
      };
      // put photo to S3 bucket
      this.http.put(objS3PutUrl, this.photo).subscribe({
        next: data => {
          // insert record to backend database
          this.postUploadService.postData(postData).then((rsp) => {
            console.log(rsp);
            console.log('Successfully upload photo to cloud.');
            this.router.navigateByUrl('/home/' + localStorage.getItem('userId'));
            window.location.reload();
            this.clearUp();
            this.close();
          });
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
  }

  onRemovePhoto(): void {
    this.inputFile.nativeElement.value = '';
    this.imgSrc = this.placeHolderSrc;
  }

  close(): void {
    this.dialogRef.close();
  }
}
