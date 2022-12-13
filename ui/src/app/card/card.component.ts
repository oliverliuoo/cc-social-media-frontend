import {Component, Input, OnInit} from '@angular/core';
import {DeletePostDialogComponent} from "../delete-post-dialog/delete-post-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(  private dialogModel: MatDialog) { }
  @Input() postText: string;
  @Input() imgSrc: string | undefined;
  @Input() postId: string;

  ngOnInit(): void {
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
