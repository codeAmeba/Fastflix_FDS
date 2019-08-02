import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  OnInit,
} from '@angular/core';
import { MovieDetail } from 'src/app/models/movies-detail';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

declare let videojs: any;

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
})
export class WatchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() movie: MovieDetail;
  vidObj: any;
  movieId: number;
  poster: string = 'https://i.ytimg.com/vi/YE7VzlLtp-4/maxresdefault.jpg';

  // 샘플 영상 링크
  video: string =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  pauseMovie: boolean = false;
  playIconActive: boolean = false;

  // 영화정보 데이터 받았다고 가정함
  movieTitle: string = 'Big Buck Bunny';
  madeYear: string = '2019';
  ageLimit: string = '12';
  runningTime: string = '9분 56초';
  movieIntro: string =
    'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.';

  // 시간 저장 변수
  hourOfMovie: number;
  minOfMovie: number;
  secOfMovie: number;

  @ViewChild('myvid', null) vid: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => (this.movieId = +params.get('id')));

    console.log('movieId', this.movieId);
  }

  ngAfterViewInit() {
    const options = {
      controls: true,
      autoplay: true,
      preload: 'auto',
      techOrder: ['html5'],
      controlBar: {
        volumePanel: { inline: true },
      },
      fluid: true
    };

    this.vidObj = new videojs(
      this.vid.nativeElement,
      options,
      function onPlayerReady() {
        videojs.log('FASTFLIX player is working!');
      }
    );

    const myPlayer = videojs('my-video');

    this.movieService.getMovieDetail(this.movieId).subscribe(detail => {
      this.video = detail['video_file'] || this.video;

      myPlayer.src({ type: 'video/mp4', src: this.video });
      console.log('video url', this.video);
    });

    // 10초 전, 후 이동 버튼 vjs-control-bar에 동적 추가
    // 뒤로가기 버튼 추가
    const myControlBar = document.querySelector('.vjs-control-bar');
    const backForwardContain = document.createElement('div');
    const backArrowContain = document.createElement('div');
    let playBackForwardButton = '';
    let backArrow = '';

    myPlayer.ready(() => {
      playBackForwardButton = `<div class="play-back"
                  style="position: absolute;
                  left: 67px;
                  margin-top: 12px;
                  cursor: pointer;">
                  <i id="move-back" 
                  class="material-icons">
                  replay_10
                  </i>
                  </div>
                  <div class="play-forward"
                  style="position: absolute;
                  left: 103px;
                  margin-top: 12px;
                  cursor: pointer;">
                  <i id="move-forward" 
                  class="material-icons">
                  forward_10
                  </i>
                  </div>`;

        backArrow = `<div 
                  class="back-arrow"
                  style="position: fixed;
                  left: 0;
                  top: 0;
                  margin: 15px;
                  cursor: pointer;">
                  <img id="back-to-home" alt="뒤로가기" src="https://www.materialui.co/materialIcons/navigation/arrow_back_white_36x36.png">
                  </div>`

      myControlBar.appendChild(backForwardContain);
      backForwardContain.classList.add('back-forward-contain');
      backForwardContain.innerHTML = playBackForwardButton;

      document
      .querySelector('#move-back')
      .addEventListener('click', this.moveBack);
      document
      .querySelector('#move-forward')
      .addEventListener('click', this.moveForward);

      myControlBar.appendChild(backArrowContain);
      backArrowContain.classList.add('back-arrow-contain');
      backArrowContain.innerHTML = backArrow;

      document.querySelector('#back-to-home').addEventListener('click', this.historyBack);

      //test
      // 플레이어 구동 시 lastTime부터 플레이 시작
      // myPlayer.currentTime(localStorage.getItem('lastTime'));
      this.movieService.getMovieDetail(this.movieId).subscribe(detail => {
        myPlayer.currentTime(detail['to_be_continue']);
      });
      // this.hourOfMovie = this.minOfMovie > 60 ? this.minOfMovie / 60 : 0;
      // this.minOfMovie = Math.round(myPlayer.currentTime() / 60);
      // this.secOfMovie = Math.round(myPlayer.currentTime() % 60);
    });

    window.addEventListener('beforeunload', this.savePlayTime);
    // window.addEventListener('beforeunload', function() {
    //   localStorage.setItem('lastTime', myPlayer.currentTime());
    // });
  }

  // OnDestroy 적용으로 컴포넌트 소멸 시(스트리밍 페이지 이탈 시) 시간 저장
  // 뒤로가기 시 시간 저장
  ngOnDestroy() {
    this.savePlayTime();
    // const myPlayer = videojs('my-video');
    // localStorage.setItem('lastTime', myPlayer.currentTime());
  }

  // 10초 전,후 이동
  moveForward() {
    const myPlayer = videojs('my-video');
    myPlayer.currentTime(myPlayer.currentTime() + 10);
  }
  moveBack() {
    const myPlayer = videojs('my-video');
    myPlayer.currentTime(myPlayer.currentTime() - 10);
  }

  // 엔터키 -> 전체화면 
  enterFullScreen() {
    const myPlayer = videojs('my-video');
    myPlayer.requestFullscreen();
  }

  // 스페이스바 -> 일시정지 or 재생
  playOrPause() {
    const myPlayer = videojs('my-video');
    myPlayer.paused() ? myPlayer.play() : myPlayer.pause();
    }
  
  // 뒤로가기 버튼
  historyBack() {
    window.history.back();
  }

  // 현재 시청 중인 영상 일시정지 시 2.5초 뒤 영화정보 트랜지션으로 노출
  pauseVideo() {
    const myPlayer = videojs('my-video');
    this.pauseMovie = false;
      setTimeout(() => {
        if (myPlayer.paused() === true) {
          this.pauseMovie = true;
        }
      }, 2000);
    } 

  savePlayTime() {
    const myPlayer = videojs('my-video');
    this.movieService
      .saveWatchingTime(this.movieId, Math.round(myPlayer.currentTime()))
      .subscribe(({ saved }) => {
        console.log('saved', saved);
      });
  }
}
