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
      autoplay: false,
      preload: 'auto',
      techOrder: ['html5']
    };

    this.vidObj = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
      videojs.log('player is working!');
    });

    const myPlayer = videojs('my-video');
    myPlayer.src({ type: 'video/mp4', 
                    src: this.video });

    myPlayer.ready(() => {
      myPlayer.currentTime(); // parameter에 재생된 시간 넣을 방법 강구
      videojs.log(myPlayer.currentTime());
      // console.log(myPlayer.duration());
    });
  }
}
