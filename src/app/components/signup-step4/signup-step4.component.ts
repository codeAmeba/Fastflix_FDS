import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-step4',
  templateUrl: './signup-step4.component.html',
  styleUrls: ['./signup-step4.component.css'],
})
export class SignupStep4Component implements OnInit {
  myListForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.myListForm = new FormGroup({});
  }
}
