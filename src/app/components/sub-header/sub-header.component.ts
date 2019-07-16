import { Component, OnInit } from '@angular/core'
import { style, state, animate, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-sub-header',
  animations: [
  trigger('fadeInOut', [
    transition(':enter', [
// :enter is alias to 'void => *'
      style({ opacity: 0 }),
      animate(150, style({ opacity: 1 }))
      ]),
    transition(':leave', [
// :leave is alias to '* => void'
      animate(150, style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
  })
export class SubHeaderComponent implements OnInit {
  showGenre: boolean
  isGrid: boolean
  showGridMenu: boolean

  constructor() {}

  ngOnInit() {
    this.showGenre = false
    this.isGrid = false
    this.showGridMenu = false
  }
}
