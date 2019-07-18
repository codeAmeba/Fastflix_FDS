import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerfadeinout } from './animations/fadeinout-animation';

@Component({
  selector: 'app-root',
  animations: [routerfadeinout],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // this.navigate();
  }

  navigate() {
    const token = JSON.parse(localStorage.getItem('login'));

    if (token) this.router.navigate(['home']);
    else this.router.navigate(['welcome']);
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
