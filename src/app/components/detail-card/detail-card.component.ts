import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css'],
})
export class DetailCardComponent implements OnInit {
  @Input() isOpen: boolean;
  @Output() detailClose = new EventEmitter();

  imageRotatorImage: object;

  constructor() {}

  ngOnInit() {
    // this.imageRotatorImage = {
    //   'background-image':
    //     'url(https://occ-0-3451-1009.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8…hfsWSXP71AbW-Y4zu5qBVu85QO95uibYFSlZitqSIzn88HjzNybPhBpc6Y68e9w.webp?r=c9b)',
    //   'z-index': 2,
    //   opacity: 1,
    //   'transition-duration': '750ms',
    // };
    this.imageRotatorImage = {
      'background-image': 'url()',
      'z-index': 2,
      opacity: 1,
      'transition-duration': '750ms',
    };
  }

  detailClosed() {
    this.isOpen = false;
    this.detailClose.emit();
  }
}
