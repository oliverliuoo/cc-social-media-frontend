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

  ngOnInit(): void {
  }
}
