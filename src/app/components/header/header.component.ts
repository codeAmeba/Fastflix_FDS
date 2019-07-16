import { Component, OnInit } from '@angular/core'
import { style, state, animate, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-header',
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
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  })
export class HeaderComponent implements OnInit {
  showDropDown: boolean

  constructor() {}

  ngOnInit() {
    this.showDropDown = false
  }

  showMenu(event: HTMLElement) {
    console.log(event)
    this.showDropDown = true
  }

  hideMenu(event: HTMLElement) {
    console.log(event)
    this.showDropDown = false
  }
}
