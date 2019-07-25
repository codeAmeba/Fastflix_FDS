import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

declare let videojs: any;

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements AfterViewInit, OnDestroy {
  vidObj: any;
  poster = 'https://i.ytimg.com/vi/YE7VzlLtp-4/maxresdefault.jpg';
  video = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  isInactive: boolean;

  
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
      videojs.log('player is working!');
    });

    const myPlayer = videojs('my-video');
    myPlayer.src({ type: 'video/mp4', 
                    src: this.video });

    const myControlBar = document.querySelector('.vjs-control-bar');
    const newDiv = document.createElement('div')
    let newButton = '';
  
    myPlayer.ready(() => {
      newButton = `<div class="play-back"
                  style="position: absolute;
                  left: 67px;
                  margin-top: 12px;
                  cursor: pointer;">
                  <i onclick="${this.moveBack()}" 
                  class="material-icons">
                  replay_10
                  </i>
                  </div>
                  <div class="play-forward"
                  style="position: absolute;
                  left: 103px;
                  margin-top: 12px;
                  cursor: pointer;">
                  <i onclick="${this.moveForward()}" 
                  class="material-icons">
                  forward_10
                  </i>
                  </div>`

      myControlBar.appendChild(newDiv);
      newDiv.classList.add('back-forward-contain');
      newDiv.innerHTML = newButton;
    });         

    
    // *테스트* beforunload 이벤트(새로고침, url 변경) 발생 시 localstorage에 현재 시간(초) 저장
    // 최종적으로 localstorage 대신 DB 적용해야 됨
    window.addEventListener('beforeunload', function () {
      localStorage.setItem('lastTime', myPlayer.currentTime());
    });

    // *테스트* 새로고침 후 재생 시 저장된 시간부터 시작       
    myPlayer.ready(() => {
      myPlayer.currentTime(localStorage.getItem('lastTime'));
      videojs.log(`마지막으로 저장된 시간 : ${myPlayer.currentTime()} 초`);
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

}
