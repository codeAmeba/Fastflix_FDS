import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

declare let videojs: any;

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements AfterViewInit, OnDestroy {
  vidObj: any;
  poster: string = 'https://i.ytimg.com/vi/YE7VzlLtp-4/maxresdefault.jpg';
  
  // 샘플 영상 링크
  video: string = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  isInactive: boolean;
  pauseMovie: boolean;

  // 영화정보 데이터 받았다고 가정함
  movieTitle: string = 'Big Buck Bunny';
  madeYear: number = 2019;
  ageLimit: string = '12';
  runningTime: string = '9분 56초';
  movieIntro: string = 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.';

  // 시간 저장 변수
  hourOfMovie: number;
  minOfMovie: number;
  secOfMovie: number; 

  @ViewChild('myvid', null) vid: ElementRef;
  
  ngAfterViewInit() {

    const options = {
      controls: true,
      autoplay: true,
      preload: 'auto',
      techOrder: ['html5'],
      controlBar: {
        volumePanel: { inline: true }
      }
    };

    this.vidObj = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
      videojs.log('FASTFLIX player is working!');
    });

    const myPlayer = videojs('my-video');
    myPlayer.src({ type: 'video/mp4', 
                    src: this.video });

    // 10초 전, 후 이동 버튼 vjs-control-bar에 동적 추가
    const myControlBar = document.querySelector('.vjs-control-bar');
    const newDiv = document.createElement('div')
    let newButton = '';
  
    myPlayer.ready(() => {
      newButton = `<div class="play-back"
                  style="position: absolute;
                  left: 67px;
                  margin-top: 12px;
                  cursor: pointer;">
                  <i id="moveback" 
                  class="material-icons">
                  replay_10
                  </i>
                  </div>
                  <div class="play-forward"
                  style="position: absolute;
                  left: 103px;
                  margin-top: 12px;
                  cursor: pointer;">
                  <i id="moveforward" 
                  class="material-icons">
                  forward_10
                  </i>
                  </div>`

      myControlBar.appendChild(newDiv);
      newDiv.classList.add('back-forward-contain');
      newDiv.innerHTML = newButton;
      
      document.querySelector('#moveback').addEventListener('click', this.moveBack);
      document.querySelector('#moveforward').addEventListener('click', this.moveForward);


      //test
      // 플레이어 구동 시 lastTime부터 플레이 시작
      myPlayer.currentTime(localStorage.getItem('lastTime'));
      this.hourOfMovie = this.minOfMovie > 60 ? this.minOfMovie / 60 : 0;
      this.minOfMovie = Math.round(myPlayer.currentTime() / 60);
      this.secOfMovie = Math.round(myPlayer.currentTime() % 60);
      videojs.log(`마지막으로 저장된 시간 : ${ this.hourOfMovie < 10 ? '0'+this.hourOfMovie : this.hourOfMovie }:${ this.minOfMovie < 10 ? '0'+this.minOfMovie : this.minOfMovie }:${ this.secOfMovie < 10 ? '0'+this.secOfMovie : this.secOfMovie }`);
      // videojs.log(`마지막으로 저장된 시간 : ${Math.round(myPlayer.currentTime())} 초`);
    });         

    // *테스트* beforunload 이벤트(새로고침, url 변경) 발생 시 localstorage에 현재 시간(초) 저장
    // 최종적으로 localstorage 대신 DB 적용해야 됨
    window.addEventListener('beforeunload', function () {
      localStorage.setItem('lastTime', myPlayer.currentTime());
    });
  }

  // OnDestroy 적용으로 컴포넌트 소멸 시(스트리밍 페이지 이탈 시) 시간 저장
  // 뒤로가기 시 시간 저장
  ngOnDestroy() {
    const myPlayer = videojs('my-video');
    localStorage.setItem('lastTime', myPlayer.currentTime());
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

  // 뒤로가기 버튼
  historyBack() {
    window.history.back();
  }

  // 뒤로가기 버튼 2.5초 후 사라짐
  playVideo() {
    setTimeout(() => {
      this.isInactive = true;
    }, 2500)
  }

  // 현재 시청 중인 영상 일시정지 시 2.5초 뒤 영화정보 트랜지션으로 노출
  pauseVideo() {
    setTimeout(() => {
      this.pauseMovie = true;
    }, 2500)
  }
}
