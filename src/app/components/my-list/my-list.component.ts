import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MoviePreview } from 'src/app/models/movie-preview';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
})
export class MyListComponent implements OnInit {
  myLists: MoviePreview[];
  sliderLines: number;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMyListMovies();
  }

  getMyListMovies() {
    this.movieService.getMyListMovies().subscribe(movies => {
      this.myLists = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
      console.log('내가 찜한 목록', this.myLists);
      this.parseMyList();
    });
  }

  parseMyList() {
    this.sliderLines = Math.ceil(this.myLists.length / 6);
  }
}
