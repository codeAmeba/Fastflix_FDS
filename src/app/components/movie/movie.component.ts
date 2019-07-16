import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  user: string;
  playBillBoard: boolean;

  constructor() {}

  ngOnInit() {
    this.user = '사용자';
    this.playBillBoard = false;
  }
}
