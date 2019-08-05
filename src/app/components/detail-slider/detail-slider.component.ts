import { Component, OnInit, Input } from '@angular/core';
import { similarMovies, MovieDetail } from 'src/app/models/movies-detail';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-detail-slider',
  templateUrl: './detail-slider.component.html',
  styleUrls: ['./detail-slider.component.css'],
})
export class DetailSliderComponent implements OnInit {
  @Input() similarContent: similarMovies[];

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  myList(movie: similarMovies) {
    this.movieService.myList(movie.id).subscribe(({ marked }) => {
      console.log('myList', movie.id, marked);
      movie.marked = marked;
    });
  }
}
