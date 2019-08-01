import { Component, OnInit } from '@angular/core';
import { MoviePreview } from 'src/app/models/movie-preview';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchMovies: MoviePreview[];
  query: string;

  sliderNums: number;
  sliderLines: MoviePreview[][];

  openedCategory: string;
  relatedContents: string[];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      console.log('query', this.query);
      this.searchService.searchMovies(this.query).subscribe(
        response => {
          console.log('search response', response);
          this.relatedContents = response.contents;
          console.log('content', this.relatedContents);
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  parseMyList() {
    this.sliderNums = Math.ceil(this.searchMovies.length / 6);
    this.sliderLines = Array.from(Array(this.sliderNums), () => Array());
    console.log(this.sliderNums);
    for (let i = 0; i < this.sliderNums; i++) {
      this.sliderLines[i] = this.searchMovies.slice(i * 6, (i + 1) * 6);
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
