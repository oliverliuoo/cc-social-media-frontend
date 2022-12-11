import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }
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
}
