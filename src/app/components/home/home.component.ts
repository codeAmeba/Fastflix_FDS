import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: string;
  playBillBoard: boolean;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authService.userName;
    this.playBillBoard = false;
    console.log('sub users', this.authService.subUsers);
  }
}
