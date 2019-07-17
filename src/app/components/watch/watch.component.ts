import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare let videojs: any;
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements AfterViewInit {
  vidObj: any;
  poster = '//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png';
  video = '//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4';

  @ViewChild('myvid', null) vid: ElementRef;

  ngAfterViewInit() {
    const options = {
      controls: true,
      autoplay: true,
      preload: 'auto',
      techOrder: ['html5']
    };

    this.vidObj = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
      videojs.log('player is working!');
    });

    const myPlayer = videojs('my-video');
    myPlayer.src({ type: 'video/mp4', 
                    src: this.video });

    // *테스트* 새로고침 후 재생 시 저장된 시간부터 시작       
    myPlayer.ready(() => {
      myPlayer.currentTime(localStorage.getItem('lastTime'));
      videojs.log(`마지막으로 저장된 시간 : ${myPlayer.currentTime()} 초`);
    });
    
    // *테스트* beforunload 이벤트 발생 시 localstorage에 현재 시간(초) 저장
    // 최종적으로 localstorage 대신 DB 적용해야 됨
    window.addEventListener("beforeunload", function () {
      const myPlayer = videojs('my-video');
      localStorage.setItem('lastTime', myPlayer.currentTime());
    });

    // history.back 이벤트 발생 현재 시간 저장
    // window.addEventListener("history.back", function () {
    //   const myPlayer = videojs('my-video');
    //   localStorage.setItem('lastTime', myPlayer.currentTime());
    // });
  }

}
