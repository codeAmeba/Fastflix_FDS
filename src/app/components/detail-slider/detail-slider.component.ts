import { Component, OnInit, Input } from "@angular/core";
import { similarMovies } from "src/app/models/movies-detail";
@Component({
  selector: "app-detail-slider",
  templateUrl: "./detail-slider.component.html",
  styleUrls: ["./detail-slider.component.css"]
})
export class DetailSliderComponent implements OnInit {
  @Input() similarContent: similarMovies[];
  constructor() {}

  ngOnInit() {}
}
