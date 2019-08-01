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

  sliderNums: number;
  sliderLines: MoviePreview[][];

  openedCategory: string;

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
    this.sliderNums = Math.ceil(this.myLists.length / 6);
    this.sliderLines = Array.from(Array(this.sliderNums), () => Array());
    console.log(this.sliderNums);
    for (let i = 0; i < this.sliderNums; i++) {
      this.sliderLines[i] = this.myLists.slice(i * 6, (i + 1) * 6);
      console.log(this.sliderLines);
    }
  }

  sliderOpened(category: string) {
    const thanos = document.querySelector('.thanos');

    this.openedCategory = category;
    thanos.classList.add('has-open-jaw');
    console.log('opened', this.openedCategory);
  }

  sliderClosed(category: string) {
    const thanos = document.querySelector('.thanos');

    this.openedCategory =
      this.openedCategory === category ? '' : this.openedCategory;

    thanos.classList.remove('has-open-jaw');

    console.log('closed', this.openedCategory);
  }
}
