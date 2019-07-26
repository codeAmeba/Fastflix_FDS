import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: string;
  playBillBoard: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.userName;
    this.playBillBoard = false;
    console.log('sub users', this.userService.subUsers);
  }
}
