import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css'],
})
export class DetailCardComponent implements OnInit {
  @Input() isOpen: boolean;

  constructor() {}

  ngOnInit() {
    this.isOpen = false;
  }
}
