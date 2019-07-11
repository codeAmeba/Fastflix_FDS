import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  })
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // this.navigate();
  }

  navigate() {
    const token = JSON.parse(localStorage.getItem('login'))

    if (token) this.router.navigate(['home'])
    else this.router.navigate(['welcome'])
  }
}
