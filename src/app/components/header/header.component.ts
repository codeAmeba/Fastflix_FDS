import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-header',
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
