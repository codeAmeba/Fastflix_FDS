import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile-slider",
  templateUrl: "./profile-slider.component.html",
  styleUrls: ["./profile-slider.component.css"]
})
export class ProfileSliderComponent implements OnInit {
  profile = "프로필 슬라이더";
  constructor() {}

  ngOnInit() {}
}
