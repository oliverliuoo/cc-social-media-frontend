import {Component, Input, OnInit} from '@angular/core';
import {DeletePostDialogComponent} from "../delete-post-dialog/delete-post-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PostPageService} from "../post-page/post-page.service";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(  private dialogModel: MatDialog,
                private postService: PostPageService) { }
  @Input() postText: string;
  @Input() imgSrc: string | undefined;
  @Input() postId: string;
  deleteVisible: boolean = true;

  ngOnInit(): void {
    this.postService.getPostByPostId(this.postId).subscribe((postRsp) => {
      if (postRsp.data[0].user_id !== localStorage.getItem('userId')) {
        this.deleteVisible = false;
      }
    });
  }

  goToDetailPage(): void {
    if (this.postId === undefined || null || '') {
      return;
    }
    window.location.href = '/post-page/' + this.postId;
  }

  openDeleteDialog(): void {
    console.log(this.postId);
    this.dialogModel.open(DeletePostDialogComponent, {
      data: { 'postId': this.postId }
    });
  }
}
