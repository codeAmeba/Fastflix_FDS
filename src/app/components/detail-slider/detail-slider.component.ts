import { Component, OnInit, Input } from '@angular/core';
import { similarMovies } from 'src/app/models/movies-detail';
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

  ngOnChanges() {
    // console.log("similar contents", this.similarContent);
  }

  myList(event) {
    const myListButton = event[0];
    const movie: similarMovies = event[1];

    this.movieService.myList(movie.id).subscribe(({ marked }) => {
      movie.marked = marked;

      if (marked) {
        myListButton.classList.remove('icon-button-mylist-add-reverse');
        myListButton.classList.add('icon-button-mylist-added-reverse');
      } else {
        myListButton.classList.remove('icon-button-mylist-added-reverse');
        myListButton.classList.add('icon-button-mylist-add-reverse');
      }
    });
  }

  onHover(myListButton: HTMLElement) {
    const parent = myListButton.parentElement;
    const message = parent.lastElementChild;

    parent.classList.add('hovered');

    if (myListButton.classList.contains('icon-button-mylist-add')) {
      myListButton.classList.remove('icon-button-mylist-add');
      myListButton.classList.add('icon-button-mylist-add-reverse');
      message.innerHTML = '내가 찜한 콘텐츠에 추가';
    } else if (myListButton.classList.contains('icon-button-mylist-added')) {
      myListButton.classList.remove('icon-button-mylist-added');
      myListButton.classList.add('icon-button-mylist-added-reverse');
      message.innerHTML = '내가 찜한 콘텐츠에서 삭제';
    }
  }

  onLeave(myListButton: HTMLElement) {
    const parent = myListButton.parentElement;

    if (myListButton.classList.contains('icon-button-mylist-add-reverse')) {
      myListButton.classList.remove('icon-button-mylist-add-reverse');
      myListButton.classList.add('icon-button-mylist-add');
    } else if (
      myListButton.classList.contains('icon-button-mylist-added-reverse')
    ) {
      myListButton.classList.remove('icon-button-mylist-added-reverse');
      myListButton.classList.add('icon-button-mylist-added');
    }

    parent.classList.remove('hovered');
  }
}
